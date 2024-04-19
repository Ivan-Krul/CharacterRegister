function Write-ImagePaths
{
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
}

function Write-PostPaths
{
	$partitionsPaths = Get-ChildItem -Path ".\posts" -Name

	$content = ""
	
	for($i = 0; $i -lt $partitionsPaths.Count - 1; $i += 1) {
		$content += "$($partitionsPaths[$i])`n"
		Write-Host $partitionsPaths[$i]
	}
	
	New-Item -Path "./posts" -Name "partitions.txt" -Value $content -Force
}

Write-PostPaths
Write-ImagePaths
