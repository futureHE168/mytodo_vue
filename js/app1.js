/*

 */
(function() {
    Vue.component('button-counter', {
        data: function() {
            return {
                count: 0
            }
        },
        template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
    })
    Vue.component('vue-component1', {
        data: function() {
            return {
                messages: 'vue-component',
                show: true
            }
        },
        template: '<div><h2> {{ messages}} </h2> <button @click = "buttonclick"> 点击弹出自己的message </button> <input type = "checkbox" v-model = "show" > 是否显示 </input> <div type = "width:200px;height:200px;background-color：pink" v-if ="show">不能显示？</div></div>',
        methods: {
            buttonclick() {
                window.alert(this.messages)
            }
        }
    })

    new Vue({
        el: '#components-demo',
        data: {
            awesome: true,
            show1: 1,
            show2: 2,
            show3: 3,
            myhtml: "<h1 style='color: #e6e6e6'> hello </h1>",
            messages: [{
                title: 'How to do lists in Vue',
                id: 1
            }, {
                title: 'should to eating',
                id: 2
            }, {
                title: 'need to sleep',
                id: 3
            }, ]
        },
    })


    window.app1 = new Vue({
        el: '#app',
        data: {
            employees: [{
                No: '001',
                name: 'zf',
                gender: 'male'
            }, {
                No: '002',
                name: 'wff',
                gender: 'female'
            }, {
                No: '003',
                name: 'dahe',
                gender: 'male'
            }, {
                No: '004',
                name: 'yc',
                gender: 'female'
            }],
            inputnamefilter: '',
            namefilter: '',
            genderfilter: '',
            body: "come here"
        },
        computed: {
            filterEm() {
                switch (this.genderfilter) {
                    case 'male':
                        return this.employees.filter(item =>
                            item.name.includes(this.namefilter) &&
                            item.gender === 'male')
                        break
                    case 'female':
                        return this.employees.filter(item =>
                            item.name.includes(this.namefilter) &&
                            item.gender === 'female')
                        break
                    default:
                        return this.employees.filter(item =>
                            item.name.includes(this.namefilter))
                        break
                }


            }

        }

    })

})()
