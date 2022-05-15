let cookie={
    set:function(key, value,time) {
       let oDay=new Date();
       oDay.setDate(oDay.getDate()+time); 
       document.cookie=key+'='+value+';expires+='+oDay;//`${key}=${value};expires=${oDay}`;
    //    key+'='+value+'=';expires+'='+oDay
       
    },
    get:function(key) {
        let str = document.cookie;
        console.log(str);
        let arr = str.split(';');
        for (let i = 0; i < arr.length; i++) {
            let temp = arr[i].split('=');
            if (temp[0] ===key) {
                return temp[1];
            }
        }
        return '';
    },
    remove:function(key){
        this.set(key,100,-1);
    }
}