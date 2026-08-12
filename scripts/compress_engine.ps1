param(
    [string]$srcDir,
    [string]$outDir
)

Add-Type -AssemblyName System.Drawing

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 75L)

if (-not (Test-Path -LiteralPath $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$files = Get-ChildItem -LiteralPath $srcDir -File
$totalOld = 0
$totalNew = 0
$count = 0
$totalCount = $files.Count

Write-Host "Starting high-speed compression of $totalCount images..."
Write-Host "==================================================="

for ($i = 0; $i -lt $totalCount; $i++) {
    $file = $files[$i]
    $srcPath = $file.FullName
    $ext = $file.Extension.ToLower()
    
    if ($ext -notin @(".jpg", ".jpeg", ".png", ".webp")) { continue }

    $oldSize = $file.Length
    $totalOld += $oldSize

    # Convert .png to .jpg for maximum space savings
    $outName = If ($ext -eq ".png") { [System.IO.Path]::ChangeExtension($file.Name, ".jpg") } Else { $file.Name }
    $outPath = [System.IO.Path]::Combine($outDir, $outName)


    $imgStream = $null
    $img = $null
    $bmp = $null
    $g = $null

    try {
        $imgStream = [System.IO.File]::OpenRead($srcPath)
        $img = [System.Drawing.Image]::FromStream($imgStream)

        # Max dimension 1400px (crystal clear web quality, 80%+ size reduction)
        $maxDim = 1400
        $w = $img.Width
        $h = $img.Height

        if ($w -gt $maxDim -or $h -gt $maxDim) {
            if ($w -gt $h) {
                $nw = $maxDim
                $nh = [int]($h * ($maxDim / $w))
            } else {
                $nh = $maxDim
                $nw = [int]($w * ($maxDim / $h))
            }
            $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.DrawImage($img, 0, 0, $nw, $nh)
            $g.Dispose()
            $img.Dispose()
            $imgStream.Close()
            $img = $bmp
        } else {
            $imgStream.Close()
        }

        if ($ext -eq ".png") {
            $bg = New-Object System.Drawing.Bitmap($img.Width, $img.Height)
            $g2 = [System.Drawing.Graphics]::FromImage($bg)
            $g2.Clear([System.Drawing.Color]::White)
            $g2.DrawImage($img, 0, 0)
            $g2.Dispose()
            $img.Dispose()
            $img = $bg
        }

        $img.Save($outPath, $jpegCodec, $encoderParams)
        $img.Dispose()

        $newSize = (Get-Item -LiteralPath $outPath).Length
        $totalNew += $newSize
        $count++

        $oldMB = [math]::Round($oldSize / 1MB, 2)
        $newMB = [math]::Round($newSize / 1MB, 2)
        $saved = If ($oldSize -gt 0) { [math]::Round((($oldSize - $newSize) / $oldSize) * 100) } Else { 0 }

        if (($i + 1) % 10 -eq 0 -or ($i + 1) -eq $totalCount) {
            Write-Host "[$($i+1)/$totalCount] ⚡ $($file.Name): $oldMB MB -> $newMB MB ($saved% saved)"
        }
    } catch {
        if ($imgStream) { $imgStream.Close() }
        Copy-Item -LiteralPath $srcPath -Destination $outPath -Force
        $totalNew += $oldSize
    }
}

$totOldMB = [math]::Round($totalOld / 1MB, 2)
$totNewMB = [math]::Round($totalNew / 1MB, 2)
$savedMB = [math]::Round($totOldMB - $totNewMB, 2)
$pct = If ($totOldMB -gt 0) { [math]::Round(($savedMB / $totOldMB) * 100, 1) } Else { 0 }

Write-Host "==================================================="
Write-Host "FINAL_SUMMARY:$count|$totOldMB|$totNewMB|$savedMB|$pct"
