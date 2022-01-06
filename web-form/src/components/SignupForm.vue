<template>
  <form @submit.prevent="handleSubmit">
    <label>Email: </label>
    <input type="email" v-model="email" required />
    <label>Password: </label>
    <input type="password" v-model="password" required />
    <p class="error" v-if="passwordError">{{ passwordError }}</p>
    <label>Role: </label>
    <select v-model="role">
      <option value="developer">Web Developer</option>
      <option value="designer">Web Designer</option>
    </select>

    <label>Skills: </label>
    <input type="text" v-model="tempSkill" @keyup="addSkill" />
    <div v-for="skill in skills" :key="skill" class="pill">
      <span @click="deleteSkill(skill)">{{ skill }}</span>
    </div>
    <div class="terms">
      <input type="checkbox" id="terms" v-model="terms" required />
      <label for="terms">Accept terms and contitions</label>
    </div>
    <div class="submit">
      <button>Create an account</button>
    </div>
  </form>

  <p>{{ email }} - {{ password }} - {{ role }} - {{ terms }} - {{ skills }}</p>
</template>

<script>
export default {
  data() {
    return {
      email: "user@msn.com",
      password: "122341234",
      passwordError: "",
      role: "developer",
      terms: true,
      tempSkill: "",
      skills: ["java", "angular"],
    };
  },
  methods: {
    addSkill(e) {
      if (e.key === "," && this.tempSkill) {
        let skill = this.tempSkill.substring(0, this.tempSkill.length - 1);
        if (!this.skills.includes(skill)) {
          this.skills.push(skill);
          this.tempSkill = "";
        }
      }
    },
    deleteSkill(skill) {
      this.skills = this.skills.filter((s) => s != skill);
    },
    handleSubmit(e) {
      console.log(this.$data);
      this.passwordError =
        this.password.length > 5
          ? ""
          : "Password must have at least 6 characters";
    },
  },
};
</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  border: none;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}
.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}
button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
.submit {
  text-align: center;
}
.error {
  color: #ff0062;
  font-size: 0.8em;
  font-weight: bold;
}
</style>