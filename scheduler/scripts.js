(function(){
  var app = new Vue({
    el: '#app',
    data: {
      teamMembers: ["Chris"],
      lastPerson: "",
      newMember: "",
    },
    mounted() {
      if (localStorage.teamMembers) {
        this.teamMembers = JSON.parse(localStorage.teamMembers);
      }
      if (localStorage.lastPerson) {
        this.lastPerson = localStorage.lastPerson;
      }
    },
    watch: {
      teamMembers(newMembers) {
        localStorage.teamMembers = JSON.stringify(newMembers);
      },
      lastPerson(newPerson) {
        localStorage.lastPerson = newPerson;
      }
    },
    methods: {
      persist() {
        if (this.newMember === "") {
          return;
        }
        this.teamMembers.push(this.newMember);
        this.newMember = "";
        this.saveState();
        console.log("Saved new member!");
      },
      moveUp(member) {
        currentIndex = this.teamMembers.indexOf(member);
        newIndex = currentIndex - 1;
        this.move(currentIndex, newIndex);
      },
      moveDown(member) {
        currentIndex = this.teamMembers.indexOf(member);
        newIndex = currentIndex + 1;
        this.move(currentIndex, newIndex);
      },
      move(fromIndex, toIndex) {
        this.teamMembers.splice(toIndex, 0, this.teamMembers.splice(fromIndex, 1)[0]);
        this.saveState();
      },
      saveState() {
        localStorage.teamMembers = JSON.stringify(this.teamMembers);
        localStorage.lastPerson = this.lastPerson;
      },
      advance() {
        this.lastPerson = this.nextPerson;
      },
    },
    computed: {
      nextPerson: function() {
        let lastPersonIndex = this.teamMembers.indexOf(this.lastPerson);
        let nextPersonIndex = (lastPersonIndex + 1) % this.teamMembers.length

        return this.teamMembers[nextPersonIndex];
      }
    },
  });
})()
