

import { CONTRACT_NAME, getConfig } from "./config";

const nearConfig = getConfig('development');

// Initialize contract & set global variables
export async function initContract () {
  // Initialize connection to the NEAR testnet
  window.walletConnection = new window.nearApi.WalletConnection(await window.nearApi.connect(nearConfig));
  window.contract =  new window.nearApi.Contract(
    await window.walletConnection.account(), 
    CONTRACT_NAME, {
    viewMethods: ['ft_total_supply', 'ft_balance_of'],
    changeMethods: ['burn', 'tranfer_money', 'mint'],
  })
}; 

export const isLogging = () => {
    return window.walletConnection.isSignedIn();
}







export const getAccount = () => {
    return window.walletConnection.getAccountId();
    
}
 
 export function logout() {

    if (isLogging()) {

        window.walletConnection.signOut();
        window.location.reload();
        // reload page
        //window.location.replace(window.location.origin + window.location.pathname)
        
    } else {

        alert('already logout');
        
    }
 
}

export async function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.

  if (!isLogging()) {
    window.walletConnection.requestSignIn(CONTRACT_NAME);
  } else {
    
    alert(`already login please as ${getAccount()}`);
  }

 
  
  
}


 export async function balances () {
    if (isLogging()) {

        //let nearConnection = await window.connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));

        let nearConnection =await window.nearApi.connect(nearConfig);
        const account = await nearConnection.account(getAccount());
        let acc = await account.getAccountBalance();

        return acc;
        
    }
        
        return false;
  
    
  }





 export async function total_supply () {

    if (isLogging()) {

        const ress = await window.contract.ft_total_supply() ;

        return ress; 
        
    }else{

        return 0;
    }
  }


  export async function your_token_bal () {

    if (isLogging()) {

        let accc = await getAccount();

        const ress = await window.contract.ft_balance_of({
            account_id: accc
        }) ;

        return ress; 
        
    }else{

        return 0;
    }
  }





  export async function mint_token (amount) {
    if (isLogging()) {

        let mint_funct = await window.contract.mint({
            
            args:{amount}
        }) ;

        return mint_funct;

        
    } 
        
        return 0;
  
  }


  export async function burn_token (amount){

    if (isLogging()) {

        let burn_funct = await window.contract.burn({
            args:{amount}
        });

        return burn_funct;
        
    } 
        return 0;
    
  }



  export async function tranfer_token (user, amount) {

    if (isLogging()) {

      let transfer_func = await window.contract.tranfer_money(
        
        {
          reciever: user, 
          amount: amount
        
        },
        "300000000000000", // attached GAS (optional)
        "1"
      );

      return transfer_func;
      
    } 
      return 0;

  }


 





