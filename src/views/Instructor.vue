<template>
  <div>
    <h1>Instructor Management Panel</h1>
    <div class="container">
      <table>
        <tr>
          <th>St. Code</th>
          <th>St. Name</th>
          <th>Homework 1</th>
          <th>Homework 2</th>
          <th>Exam</th>
          <th>Final grade</th>
          <th></th>
        </tr>
        <tr class="item" v-for="grade in grades" :key="grade.id">
          <td><input name="studentcode" type="text" id="studentcode" required v-model="grade.studentcode"></td>
          <td><input name="studentname" type="text" id="studentname" required v-model="grade.studentname"></td>
          <td><input name="hw1" type="number" id="hw1" required v-model="grade.hw1" @input="calculateFinalGrade(grade)"></td>
          <td><input name="hw2" type="number" id="hw2" required v-model="grade.hw2" @input="calculateFinalGrade(grade)"></td>
          <td><input name="exam" type="number" id="exam" required v-model="grade.exam" @input="calculateFinalGrade(grade)"></td>
          <td><div class="finalgrade">{{ grade.final }}</div></td>
          <td><button class="update" @click="updateGrade(grade)">update</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Instructor",
  data() {
    return {
      grades: [],
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/grades`)
        .then((response) => response.json())
        .then((data) => (this.grades = data))
        .catch((err) => console.log(err.message));
    },
    calculateFinalGrade(grade) {
      grade.final = parseFloat(grade.hw1) + parseFloat(grade.hw2) + parseFloat(grade.exam);
    },
    updateGrade(grade) {
      fetch(`http://localhost:3000/api/grades/${grade.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentcode: grade.studentcode,
          studentname: grade.studentname,
          hw1: grade.hw1,
          hw2: grade.hw2,
          exam: grade.exam,
          final: grade.final,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const index = this.grades.findIndex((g) => g.id === grade.id);
          if (index !== -1) {
            this.$set(this.grades, index, data);
          }
          this.$router.push('Students');
        })
        .catch((err) => console.log(err.message));
    },
  },
  watch: {
    grades: {
      handler: "calculateFinalGrade",
      deep: true,
    },
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  margin-top: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 80%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
}
input {
  width: 100px;
  text-align: center;
}

.finalgrade {
  background-color: aqua;
}

.update {
  background: aqua;
}
</style>
