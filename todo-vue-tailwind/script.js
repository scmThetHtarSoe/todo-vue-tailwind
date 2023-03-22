const getlist =
  JSON.parse(localStorage.getItem("todos")) == null
    ? []
    : JSON.parse(localStorage.getItem("todos"));
const leftItem = getlist.filter((data) => data.status != true).length;
const { createApp } = Vue;
createApp({
  data() {
    return {
      todos: getlist,
      newList: "",
      listUncompleteCount: leftItem,
    };
  },
  methods: {
    addList() {
      this.todos =
        JSON.parse(localStorage.getItem("todos")) == null
          ? []
          : JSON.parse(localStorage.getItem("todos"));
      if (this.newList.trim() != "") {
        let list = { text: this.newList, status: false, showEditingbox: false };
        this.todos = [...this.todos, list];
      }

      this.newList = "";
      this.updateLocalStorage();
      this.listUncompleteCount = this.todos.filter(
        (data) => data.status != true
      ).length;
    },
    updateLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    deleteList(index) {
      this.todos.splice(index, 1);
      this.updateLocalStorage();
      this.listUncompleteCount = this.todos.filter(
        (data) => data.status != true
      ).length;
    },
    checkList(index) {
      this.todos[index].status =
        this.todos[index].status == true ? false : true;
      this.updateLocalStorage();
      this.listUncompleteCount = this.todos.filter(
        (data) => data.status != true
      ).length;
    },
    showAll() {
      this.todos =
        JSON.parse(localStorage.getItem("todos")) == null
          ? []
          : JSON.parse(localStorage.getItem("todos"));
    },
    showActive() {
      const getAllLists =
        JSON.parse(localStorage.getItem("todos")) == null
          ? []
          : JSON.parse(localStorage.getItem("todos"));
      this.todos = getAllLists.filter((data) => data.status != true);
    },
    showCompleted() {
      const getAllLists =
        JSON.parse(localStorage.getItem("todos")) == null
          ? []
          : JSON.parse(localStorage.getItem("todos"));
      this.todos = getAllLists.filter((data) => data.status == true);
    },
    checkAll(el) {
      this.todos =
        JSON.parse(localStorage.getItem("todos")) == null
          ? []
          : JSON.parse(localStorage.getItem("todos"));
      if (el.target.innerText == "Check All") {
        this.todos.filter((data) => (data.status = true));
      } else {
        this.todos.filter((data) => (data.status = false));
      }
      this.updateLocalStorage();
      this.listUncompleteCount = this.todos.filter(
        (data) => data.status != true
      ).length;
    },
    clearCompleted() {
      this.todos = this.todos.filter((data) => data.status != true);
      this.updateLocalStorage();
      this.listUncompleteCount = this.todos.filter(
        (data) => data.status != true
      ).length;
    },
    updateList(el) {
      if (el.target.value.trim() == "") {
        this.todos =
          JSON.parse(localStorage.getItem("todos")) == null
            ? []
            : JSON.parse(localStorage.getItem("todos"));
      } else {
        this.updateLocalStorage();
      }
    },
    showAutofocus(index) {
      this.$nextTick(() => this.$refs["editFocus"][index].focus());
    },
  },
}).mount("#todoApp");
