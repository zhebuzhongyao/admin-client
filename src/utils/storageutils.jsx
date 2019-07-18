import store from 'store'



export default{
    // //保存user
    saveUser(user){
        store.set('userkey', user)
    //     localStorage.setItem('userkey',JSON.stringify(user))
     },
    // //获取user，返回一个user对象，如果没有返回一个{}
    getUser(){       
    //     return JSON.parse(localStorage.getItem('userkey')||'{}') 
    return store.get('userkey')||{}
    },
    
    
    // //删除user
    removeUser(){
    //     localStorage.removeItem('userkey')
    store.remove('userkey')
     }

    
    
    


}
