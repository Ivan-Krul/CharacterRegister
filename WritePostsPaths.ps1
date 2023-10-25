$partitionsPaths = Get-ChildItem -Path ".\posts" -Filter "*.html" -Name

$content = ""

foreach($partitionsPath in $partitionsPaths)
{
    $content += "$($partitionsPath)`n"
    Write-Host $partitionsPath
}

New-Item -Path "./posts" -Name "partitions.txt" -Value $content -Force
