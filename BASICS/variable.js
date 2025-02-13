const accountId = 14457
let accountEmail = "shanidhya@gmail.com" 
var accountPassword = "12345"
accountCity = "Jaipur"
let accountState;


// accountId = 2 // not allowed
accountEmail = "shan@gmail.com"
accountPassword = "21213245"
accountCity = "Patna"


console.log(accountId);

/*
prefer not to use var
because of issue in block and functional scope
*/


console.table([accountId,accountEmail,accountPassword,accountCity,accountState]);