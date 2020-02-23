$azemail = "foo@Bar.com"
$azpw = "FooBar"
$azTenant = "333509fc-868d-4474-b079-5b33a7193456"

$target_location = "japaneast"

$target_resource_group = "yama20200223tsbp1rg"

$target_storage_name = "yama20200223tsbp1strg01"
$target_container_name = "publicapilog"
             
$target_eventhub_ns = "yama20200223tsbp1evthns"
$target_eventhub = "yama20200223tsbp1evth"

$target_apim_name = "yama20200223apim"
$org_name = "YASC"
$admin_email = "tomoya.yamanaka@yasc.info"
$apim_product_id = 100;
$apim_product_title = "Yasc Product";
$apiapim_product_desc = "This is Yasc's product!"

#Azure Signin
$secpasswd = ConvertTo-SecureString $azpw -AsPlainText -Force
$mycreds = New-Object System.Management.Automation.PSCredential ($azemail, $secpasswd)
Login-AzAccount -Tenant $azTenant #-Credential $mycreds

#Resource Group
$temp_rg = $null
$temp_rg = Get-AzResourceGroup -name $target_resource_group -ErrorAction SilentlyContinue
if ( $temp_rg -eq $null )
{
    New-AzResourceGroup -Location $target_location -Name $target_resource_group
}

#APIM Management
$temp = Get-AzApiManagement -Name $target_apim_name -ResourceGroupName $target_resource_group -ErrorAction SilentlyContinue
if ( $temp -eq $null )
{
     New-AzApiManagement -ResourceGroupName $target_resource_group -Name $target_apim_name -Location $target_location -Organization $org_name -AdminEmail $admin_email
     $Api = Get-AzAPIManagement -ResourceGroupName $target_resource_group -Name $target_apim_name
     $apiContext = New-AzApiManagementContext -ResourceGroupName $api.resourcegroupname -ServiceName $api.name
     $newProduct = New-AzApiManagementProduct -Context $apiContext -ProductId $apim_product_id -Title $apim_product_title -Description $apiapim_product_desc -State Published
}
