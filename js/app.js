;
(function() {
    const todos = [{
        id: 1,
        title: '吃饭',
        completed: false
    }, {
        id: 2,
        title: '睡觉',
        completed: false
    }, {
        id: 3,
        title: '拉屎',
        completed: false
    }]

    Vue.directive('autofocus', function(el, binding) {
        el.focus()
    })

    Vue.directive('todofocus', {
        update(el, binding) {
            if (binding.value)
                el.focus()
        }
    })

    window.app = new Vue({
        data: {
            todos: JSON.parse(window.localStorage.getItem('todos')) || [],
            vuename: 'vue-control',
            currentEditing: null,
            visibility: 'all',
            filtertext: 'all',
        },
        methods: {
            handleKeyDownEnter(e) {
                // Console.print('adf')
                const target = e.target
                const value = target.value.trim()
                if (!value.length) {
                    return
                }
                const todos = this.todos
                todos.push({
                    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
                    title: value,
                    completed: false
                })
                target.value = ''

            },
            handleRemoveTodoClick(index, e) {
                this.todos.splice(index, 1)
            },
            handleGetEditingDbclick(todo) {
                this.currentEditing = todo
            },
            handleSaveEditKeydown(todo, index, e) {
                this.currentEditing = null
                const target = e.target
                const value = target.value.trim()
                if (!value.length) {
                    this.todos.splice(index, 1)
                } else {
                    todo.title = value
                    this.currentEditing = null
                }

            },
            handleCancelEditEsc() {
                this.currentEditing = null
            },
            handleClearAllDoneClick() {
                for (let i = this.todos.length - 1; i >= 0; i--) {
                    console.info(this.todos[i], "-")
                    if (this.todos[i].completed) {
                        this.todos.splice(i, 1)
                    }
                }
            },
            handleAllCheck(e) {
                const value = e.target.checked
                this.todos.forEach((item, index) => {
                    item.completed = value
                })
            },
            getRemaincount() {
                return this.todos.filter(item => !item.completed).length
            },
        },
        computed: {
            Remaincount: {
                get() {
                    return this.todos.filter(item => !item.completed).length
                },
                set() {
                    console.log("set method calling")
                }
            },
            toggleAllStat: {
                get() {
                    return this.todos.every(item => item.completed)
                },
                set() {
                    const checked = !this.toggleAllStat
                    this.todos.forEach(item => { item.completed = checked })
                }
            },
            filtertodos() {
                switch (this.filtertext) {
                    case 'active':
                        return this.todos.filter(item => !item.completed)
                    case 'completed':
                        return this.todos.filter(item => item.completed)
                        break;
                    default:
                        return this.todos
                        break
                }
            }
        },
        watch: {
            //普通监视
            // todos() {
            //     window.localStorage.setItem('todos', JSON.stringify(this.todos))
            // }
            // 深度监视
            todos: {
                handler(val, oldval) {
                    window.localStorage.setItem('todos', JSON.stringify(val))
                },
                deep: true //深度检测设置项
            },
        }
    }).$mount('#app')
    console.log(window.location.hash)
    window.onhashchange = function() {
        app.filtertext = window.location.hash.substr(2)
    }
    window.onhashchange()
})()
