<template>
  <div>
    <h3>Students grades</h3>

    <div class="container">
      <table>
        <thead>
          <tr>
            <th>St. Code</th>
            <th>Homework 1</th>
            <th>Homework 2</th>
            <th>Exam</th>
            <th>Final grade</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="grade in grades" :key="grade.id">
            <td>{{ grade.studentcode }}</td>
            <td>{{ grade.hw1 }}</td>
            <td>{{ grade.hw2 }}</td>
            <td>{{ grade.exam }}</td>
            <td :style="{ background: grade.final <= 50 || grade.exam <= 20 ? 'red' : 'green' }" @click="showJustification(grade)">
              {{ grade.final }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="justification" v-if="justificationVisible">
      <p :style="{ background: justificationBackgroundColor }">{{ justificationText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Students",
  data() {
    return {
      grades: [],
      justificationVisible: false,
      justificationText: "",
      
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/grades`)
        .then((response) => response.json())
        .then((data) => (this.grades = data))
        .catch((err) => console.log(err.message));
    },
    showJustification(grade) {
      if (grade.final <= 50 && grade.exam <= 20) {
        this.justificationText = "Grade justification: You failed because you need to get 21 points or more in the exam to pass the course and you also need 51 points or more in the HWs and exam to pass the course.";
      } else if(grade.final <= 50 && grade.exam > 20){
        this.justificationText = "Grade justification: You failed because you need to get 51 or more points in the HWs and exam to pass the course.";
      } else if(grade.final > 50 && grade.exam <= 20){
        this.justificationText = "Grade justification: You failed because you need to get 21 or more points in the exam to pass the course.";
      } else if(grade.final > 50 && grade.exam > 20){
        this.justificationText = "Grade justification: You have passed because you got over 20 points in the exam and over 50 points in the HWs and exam!";
      }
        

      this.justificationVisible = true;
    },
  },
  mounted() {
    this.fetchRecords();
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.container {
  background: #d5d7d8;
  margin-bottom: 30px;
  margin-top: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 80%;
  display: flex;
  justify-content: center;
}
table {
  width: 100%;
  margin-top: 20px;
}
th, td {
  border: 3px solid #dddddd;
  text-align: left;
  padding: 8px;
  color: black;
}
th {
  background-color: brown;
}
tbody {
  background-color: #e2a499;
  color: black;
}
.justification {
  background: rgb(16, 153, 194);
  margin-bottom: 30px;
  margin-top: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 80%;
  display: flex;
  justify-content: center;
}
</style>
