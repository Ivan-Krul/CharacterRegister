$paths = Get-ChildItem -Path "image" -Name -Recurse -File

$str = ""

foreach ($path in $paths) {
    <# $path is the current item #>
    if ( $path -notmatch "Not mine" -and $path -notmatch "marathon" ) 
    {
        $str += "image\"
        $str += $path
        $str += "`n"
    }
}

New-Item -Path "./image" -Name "paths.txt" -Value $str -Force
