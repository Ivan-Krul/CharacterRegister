function Write-ImagePaths
{
	$paths = Get-ChildItem -Path "image" -Recurse -File |
	    Sort-Object -Property {$_.LastWriteTime}

	[array]::Reverse($paths)

	$str = ""
	$const = "CharacterRegister";

	foreach ($path in $paths) {
		<# $path is the current item #>
		$filepath = $path.FullName
		$filepath = $filepath.Substring($filepath.IndexOf($const) + $const.Length + 1);
		Write-Host $filepath
		if ( $filepath -match "OCPool" -or $filepath -match "Buttons") 
		{
			$str += "$filepath`n"
		}
	}
	
	New-Item -Path "./image" -Name "paths.txt" -Value $str -Force
}

Write-ImagePaths
