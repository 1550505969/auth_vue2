import Cookie from 'js-cookie'
export default {
    state:{
        isCollapse:false,
        // 面包屑数据
        tabsList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'s-home',
                url:'Home/Home'
            },
        ],
        menu:[]
    },
    mutations:{
        // 修改菜单展开收起的方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse;
        },
        // 修改tabsList数据
        selectMenu(state,val){
            // 判断添加的数据是否为首页
            if(val.name !== 'home'){
                const index = state.tabsList.findIndex(item => {
                    return item.name === val.name
                })
                // 如果不存在
                if(index === -1){
                    state.tabsList.push(val);
                }
            }
        },
        closeTag(state,item){
            const resultIndex = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(resultIndex,1)
        },
        setMenu(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        // 动态注册路由
        addMenu(state,router){
            if(!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 组装动态路由
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    console.log('...',...item.children);
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log(menuArray);
            menuArray.forEach(item => {
                console.log(item);
                router.addRoute('Main',item)
            })
        }
    }
}