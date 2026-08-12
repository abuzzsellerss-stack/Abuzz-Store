
Add-Type -AssemblyName System.Drawing

$srcDir = "G:\\Website\\Abuzz.store\\abuzz-store\\abuzz-store\\public\\products"
$outDir = "G:\\Website\\Abuzz.store\\abuzz-store\\HOSTINGER_IMAGES_TO_UPLOAD\\products"

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 85L)

$files = Get-ChildItem -Path $srcDir -File
$totalOld = 0
$totalNew = 0
$count = 0

foreach ($file in $files) {
    $srcPath = $file.FullName
    $outPath = Join-Path -Path $outDir -ChildPath $file.Name
    $oldSize = $file.Length
    $totalOld += $oldSize

    try {
        $img = [System.Drawing.Image]::FromFile($srcPath)
        
        # Max dimension cap at 1800px (crystal clear for full zoom, saves massive memory)
        $maxDim = 1800
        $w = $img.Width
        $h = $img.Height

        if ($w -gt $maxDim -or $h -gt $maxDim) {
            if ($w -gt $h) {
                $newW = $maxDim
                $newH = [int]($h * ($maxDim / $w))
            } else {
                $newH = $maxDim
                $newW = [int]($w * ($maxDim / $h))
            }
            $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.DrawImage($img, 0, 0, $newW, $newH)
            $g.Dispose()
            $img.Dispose()
            $img = $bmp
        }

        # Save as optimized JPEG
        if ($file.Extension -ieq ".png") {
            # For PNGs with transparency or without, compress appropriately
            $bmpTemp = New-Object System.Drawing.Bitmap($img.Width, $img.Height)
            $gTemp = [System.Drawing.Graphics]::FromImage($bmpTemp)
            $gTemp.Clear([System.Drawing.Color]::White)
            $gTemp.DrawImage($img, 0, 0)
            $gTemp.Dispose()
            $img.Dispose()
            $outJpgPath = [System.IO.Path]::ChangeExtension($outPath, ".jpg")
            $bmpTemp.Save($outJpgPath, $jpegCodec, $encoderParams)
            $bmpTemp.Dispose()
        } else {
            $img.Save($outPath, $jpegCodec, $encoderParams)
            $img.Dispose()
        }

        $newSize = (Get-Item (If (Test-Path $outPath) { $outPath } Else { [System.IO.Path]::ChangeExtension($outPath, ".jpg") })).Length
        $totalNew += $newSize
        $count++
    } catch {
        # Fallback copy if unsupported format
        Copy-Item -Path $srcPath -Destination $outPath -Force
        $totalNew += $oldSize
    }
}

$oldMB = [math]::Round($totalOld / 1MB, 2)
$newMB = [math]::Round($totalNew / 1MB, 2)
$savedMB = [math]::Round($oldMB - $newMB, 2)
$pct = If ($oldMB -gt 0) { [math]::Round(($savedMB / $oldMB) * 100, 1) } Else { 0 }

Write-Host "STAT_RESULTS:$count|$oldMB|$newMB|$savedMB|$pct"
