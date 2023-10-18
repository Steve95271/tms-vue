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

            <el-button size="mini" type="primary" @click="refreshData()">Refresh</el-button>
            
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
            <el-table :data="tableData" style="width: 100%; border: 1px solid rgb(211, 209, 209)">

              <!-- Task column -->
              <el-table-column prop="taskTitle" label="Tasks / Plans" width="180">
              </el-table-column>

              <!-- Task detail column -->
              <el-table-column prop="taskContent" label="Details" width="180">
              </el-table-column>

              <!-- Due date column -->
              <el-table-column prop="dueDate" label="Due date" width="120">
              </el-table-column>

              <!-- edit and delete button -->
              <el-table-column width="180">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                    Edit
                  </el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                    Delete
                  </el-button>


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
          <el-form :model="addTaskData">
            <el-form-item label="Tasks" :label-width="formLabelWidth">
              <el-input v-model="addTaskData.taskTitle" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Content" :label-width="formLabelWidth">
              <el-input v-model="addTaskData.taskContent" type="textarea" placeholder="Enter content"></el-input>
            </el-form-item>

            <el-form-item label="Due Date" :label-width="formLabelWidth">
              <el-date-picker v-model="addTaskData.dueDate" type="date" placeholder="Select date"
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
          <el-form :model="editDialogData">
            <el-form-item label="Tasks" :label-width="formLabelWidth">
              <el-input v-model="editDialogData.taskTitle" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Content" :label-width="formLabelWidth">
              <el-input v-model="editDialogData.taskContent" type="textarea" placeholder="Enter content"></el-input>
            </el-form-item>

            <el-form-item label="Due Date" :label-width="formLabelWidth">
              <el-date-picker v-model="editDialogData.dueDate" type="date" placeholder="Select date"
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
import axios from "axios";

export default {
  name: 'TasksPlansView',

  data() {
    return {
      tableData: [],

      addTaskDialogFormVisible: false,

      editDialogFormVisible: false,

      addTaskData: {
        id: '',
        taskTitle: '',
        taskContent: '',
        dueDate: ''
      },

      editDialogData: {
        id: '',
        taskTitle: '',
        taskContent: '',
        dueDate: ''
      },

      formLabelWidth: '120px',

      currentUser: 'Steve'


    }
  },

  mounted() {
    // Sent request to Spring Boot application to get data
    axios.get("tasks").then((result) => {
      this.tableData = result.data.data
    })
  },

  methods: {
    submit: function () {
      this.addTaskDialogFormVisible = false

      alert(JSON.stringify(this.addTaskData))
    },

    updateSubmit: function () {

      //update data to service
      axios.put("tasks", {
        id: this.editDialogData.id,
        taskTitle: this.editDialogData.taskTitle,
        taskContent: this.editDialogData.taskContent,
        dueDate: this.editDialogData.dueDate
      }).then((result) => {
        this.tableData = result.data.data
      });

      

      this.editDialogFormVisible = false
    },

    refreshData: function () {
      axios.get("tasks").then((result) => {
        this.tableData = result.data.data
      })
    },

    handleEdit: function (index) {
      this.editDialogFormVisible = true;

      var getId = index + 1;

      //alert(JSON.stringify("tasks/" + getId))

      axios.get("tasks/" + getId).then((result) => {
        this.editDialogData = result.data.data
      })
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
