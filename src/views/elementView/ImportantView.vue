<template>
  <el-card>
    <el-container style="height: 100%; border: 1px solid rgb(255, 255, 255)">
      <!-- Header -->
      <el-header style="font-size: 40px; background-color: rgb(121, 172, 158)">
        <span>Task Manage System</span>
      </el-header>


      <el-container>
        <!-- side menu -->
        <el-aside style="margin-top: 10px;">
          <el-menu style="margin-top: 30%;">
            <el-menu-item>
              <router-link to="/TasksPlans">
                Tasks / Plans
              </router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/Important">
                Important
              </router-link>
            </el-menu-item>
            <el-menu-item>Group Tasks</el-menu-item>
            <el-menu-item>Deleted Task / Plans</el-menu-item>
          </el-menu>
        </el-aside>

        <el-container>

          <!-- header for login button -->
          <el-header style="font-size: 40px; text-align: right;">

            <!-- <input type="button" @click="handleLogout()" v-model="currentUser" style="margin-right: 10px;"> -->

            <!-- Logout -->
            <el-dropdown @command="handleLogout()">
              <input type="button" v-model="currentUser" style="margin-right: 10px;">
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Logout</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>

          <el-main style="border: 1px solid rgb(255, 255, 255)">
            <!-- tasks list -->
            <el-table :data="importantTaskData" style="width: 100%; border: 1px solid rgb(211, 209, 209)">

              <!-- Task column -->
              <el-table-column prop="task" label="Tasks / Plans" width="180">
              </el-table-column>

              <el-table-column prop="dueDate" label="Due date" width="120">
              </el-table-column>

              <!-- edit and delete button -->
              <el-table-column width="180">
                <template>
                  <el-button size="mini" @click="editDialogFormVisible = true">Edit</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete()">Delete</el-button>
                </template>
              </el-table-column>

              <!-- complete button -->
              <el-table-column>
                <template>
                  <el-button size="mini" type="success" @click="handleComplete()">Complete</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>

        </el-container>


      </el-container>

      <el-footer style="margin-top: 10px">
        <!-- Add Task button -->
        <el-button type="primary" style="position: absolute; right: 100px" @click="addTaskDialogFormVisible = true">
          Add Task
        </el-button>

        <!-- Add Task dialog -->
        <el-dialog title="Add new task" :visible.sync="addTaskDialogFormVisible">
          <el-form :model="form">
            <el-form-item label="Tasks" :label-width="formLabelWidth">
              <el-input v-model="addTaskForm.taskTitle" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Content" :label-width="formLabelWidth">
              <el-input v-model="addTaskForm.taskContent" type="textarea" placeholder="Enter content"></el-input>
            </el-form-item>

            <el-form-item label="Due Date" :label-width="formLabelWidth">
              <el-date-picker v-model="addTaskForm.dateValue" type="date" placeholder="Select date"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="addTaskDialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="submit()">Submit</el-button>
          </div>
        </el-dialog>

        <!-- Edit dialog -->

        <el-dialog title="Edit" :visible.sync="editDialogFormVisible">
          <el-form :model="editDialogForm">
            <el-form-item label="Tasks" :label-width="formLabelWidth">
              <el-input v-model="editDialogForm.taskTitle" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Content" :label-width="formLabelWidth">
              <el-input v-model="editDialogForm.taskContent" type="textarea" placeholder="Enter content"></el-input>
            </el-form-item>

            <el-form-item label="Due Date" :label-width="formLabelWidth">
              <el-date-picker v-model="editDialogForm.dateValue" type="date" placeholder="Select date"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="updateSubmit()">Submit</el-button>
          </div>
        </el-dialog>

      </el-footer>

    </el-container>
  </el-card>
</template>

<script>
//import axios from "axios";

export default {
  name: 'ImportantView',

  data() {
    return {
      // Important task data
      importantTaskData: [
        {
          state: 'Not done',
          task: 'Task 4',
          dueDate: '2023-12-04',
          detail: 'Task 4 detail',
          file: 'file 1 2 3',
        },
      ],

      addTaskDialogFormVisible: false,

      editDialogFormVisible: false,

      addTaskForm: {
        taskTitle: '',
        taskContent: '',
        dateValue: ''
      },

      editDialogForm: {
        taskTitle: 'abc',
        taskContent: '1123',
        dateValue: ''
      },

      formLabelWidth: '120px',

      currentUser: 'Steve'


    }
  },

  mounted() { },

  methods: {
    submit: function () {
      this.addTaskDialogFormVisible = false

      alert(JSON.stringify(this.addTaskForm))
    },

    updateSubmit: function () {
      this.addTaskDialogFormVisible = false

      alert(JSON.stringify(this.editDialogForm))
    },

    handleComplete: function () {

      alert("Misson Complete!")

    },

    handleDelete: function () {
      alert("Task deleted")
    },

    handleLogout: function () {
      alert("User sign off")
    }
  },
}
</script>

<style lang="scss" scoped></style>
