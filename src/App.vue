<template>
  <div class="navbar navbar-fixed-top scroll-hide">
    <div class="container-fluid main-nav clearfix" v-if="false">
        <div class="nav-collapse">
            <ul class="nav">
                <li>
                    <a href="/"><span aria-hidden="true" class="se7en-home"></span>Dashboard</a>
                </li>
                <li><a href="#charts">
                        <span aria-hidden="true" class="se7en-charts"></span>Charts</a>
                </li>
                <li class="dropdown"><a data-toggle="dropdown" href="#">
                        <span aria-hidden="true" class="se7en-pages"></span>Files</a>
                </li>
                <li><a href="gallery.html">
                        <span aria-hidden="true" class="se7en-feed"></span>Setting</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="container-fluid top-bar">
      <div class="pull-right">
        <ul class="nav navbar-nav pull-right">
            <li class="user">
                <a href="#">Test + Excel = Magic Tool</a>
            </li>
        </ul>
        <ul class="nav navbar-nav pull-right" v-if="false">
            <li class="dropdown notifications hidden-xs">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#"><span aria-hidden="true" class="se7en-flag"></span>
                    <div class="sr-only">
                        Notifications
                    </div>
                    <p class="counter">
                        4
                    </p>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="#">
                            <div class="notifications label label-info">
                                New
                            </div>
                            <p>
                                New user added: Jane Smith
                            </p></a>

                    </li>
                    <li><a href="#">
                            <div class="notifications label label-info">
                                New
                            </div>
                            <p>
                                Sales targets available
                            </p></a>

                    </li>
                    <li><a href="#">
                            <div class="notifications label label-info">
                                New
                            </div>
                            <p>
                                New performance metric added
                            </p></a>

                    </li>
                    <li><a href="#">
                            <div class="notifications label label-info">
                                New
                            </div>
                            <p>
                                New growth data available
                            </p></a>

                    </li>
                </ul>
            </li>
            <li class="dropdown user hidden-xs"><a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                                Jobs Long<b class="caret"></b></a>
                <ul class="dropdown-menu">
                    <li><a href="#">
                            <i class="fa fa-user"></i>My Account</a>
                    </li>
                    <li><a href="#">
                            <i class="fa fa-gear"></i>Account Settings</a>
                    </li>
                    <li><a href="login1.html">
                            <i class="fa fa-sign-out"></i>Logout</a>
                    </li>
                </ul>
            </li>
        </ul>
      </div>
      <ul class="nav navbar-nav">
          <!-- Project Sheet -->
          <li v-if="selectedProject == null" class="dropdown project"><a data-toggle="modal" href="#createProjectModal">
              <i class="fa fa-folder-open"></i> New Test Project</a>
          </li>
          <li v-if="selectedProject != null" class="dropdown project"><a data-toggle="dropdown" class="dropdown-toggle" href="#">
              <i class="fa fa-folder-open"></i> {{ selectedProject.name }}<b class="caret"></b></a>
              <ul class="dropdown-menu">
                  <li v-for="(key, project) in projects" v-if="project.key != selectedProject.key">
                      <a href="#" @click="selectProject(project)">{{project.name}}</a>
                  </li>
                  <li><a data-toggle="modal" href="#createProjectModal">
                      New Test Project</a>
                  </li>
              </ul>
          </li>
          <!-- Sheet Dropdown -->
          <li v-if="selectedProject != null && selectedSheet == null" class="dropdown sheet">
              <a data-toggle="modal" href="#createSheetModal">New Sheet</a>
          </li>
          <li v-if="selectedSheet" class="dropdown sheet"><a data-toggle="dropdown" class="dropdown-toggle" href="#">
                  {{ selectedSheet.name }} <b class="caret"></b></a>
              <ul class="dropdown-menu">
                  <li v-for="(key, sheet) in selectedProject.sheets" v-if="sheet.key != selectedSheet.key"><a href="#" @click="selectSheet(sheet)"> {{ sheet.name }}</a></li>
                  <li><a data-toggle="modal" href="#createSheetModal">New Sheet</a></li>
              </ul>
          </li>
          <!-- Testgroup Dropdown -->
          <li v-if="selectedProject != null && selectedTestGroups.length == 0" class="dropdown sheet">
              <a data-toggle="modal" href="#createTestGroupModal">New Test Group</a>
          </li>
          <li v-if="selectedSheet != null && selectedTestGroups.length != 0" class="dropdown sheet"><a data-toggle="dropdown" class="dropdown-toggle" href="#">
                  {{ selectedTestGroups[0].name }} <b class="caret"></b></a>
              <ul class="dropdown-menu">
                  <li v-for="(key, testgroup) in selectedSheet.testgroups" v-if="testgroup.key != selectedTestGroups[0].key"><a href="#" @click="selectTestGroup(testgroup)"> {{ testgroup.name }}</a></li>
                  <li><a href="#" @click="showAllTestGroup">All Test Group</a></li>
                  <li><a data-toggle="modal" href="#createTestGroupModal">New Test Group</a></li>
              </ul>
          </li>

          <li v-if="selectedSheet" class="dropdown sheet"><a data-toggle="modal" href="#createTestCaseModal">
                  New TestCase</a>
          </li>
      </ul>
    </div>

    <div class="modal fade" id="createProjectModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button aria-hidden="true" class="close" data-dismiss="modal" type="button">×</button>
                    <h4 class="modal-title">
                        New Test Project
                    </h4>
                </div>
                <div class="modal-body">
                    <form action="#" class="form-horizontal" onsubmit="return false;">
                        <div class="form-group">
                            <label class="control-label col-md-2" for="name">项目名称</label>
                            <div class="col-md-7">
                                <input class="form-control" id="name" placeholder="" v-model="newProjet.name" type="text">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" type="button" @click="storeProject">Save</button><button class="btn btn-default-outline" data-dismiss="modal" type="button">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="createSheetModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button aria-hidden="true" class="close" data-dismiss="modal" type="button">×</button>
                    <h4 class="modal-title">
                        New Sheet
                    </h4>
                </div>
                <div class="modal-body">
                    <form action="#" class="form-horizontal" onsubmit="return false;">
                        <div class="form-group">
                            <label class="control-label col-md-2" for="name">表单名称</label>
                            <div class="col-md-7">
                                <input class="form-control" id="name" placeholder="" v-model="newSheet.name" type="text">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" type="button" @click="storeSheet">Save</button><button class="btn btn-default-outline" data-dismiss="modal" type="button">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="createTestGroupModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button aria-hidden="true" class="close" data-dismiss="modal" type="button">×</button>
                    <h4 class="modal-title">
                        New Test Group
                    </h4>
                </div>
                <div class="modal-body">
                    <form action="#" class="form-horizontal" onsubmit="return false;">
                        <div class="form-group">
                            <label class="control-label col-md-2" for="name">测试组名称</label>
                            <div class="col-md-7">
                                <input class="form-control" id="name" placeholder="" v-model="newTestGroup.name" type="text">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" type="button" @click="storeTestGroup">Save</button><button class="btn btn-default-outline" data-dismiss="modal" type="button">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="createTestCaseModal" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button aria-hidden="true" class="close" data-dismiss="modal" type="button">×</button>
                    <h4 class="modal-title">
                        New Test Case
                    </h4>
                </div>
                <div class="modal-body">
                    <form action="#" class="form-horizontal" onsubmit="return false;">
                        <fieldset disabled="">
                            <div class="form-group">
                                <label class="control-label col-md-2" for="code">编码号</label>
                                <div class="col-md-7">
                                    <input class="form-control" id="code" placeholder="GJYH-001" value="GJYH-001" v-model="newTestCase.code" type="text">
                                </div>
                            </div>
                        </fieldset>
                        <div class="form-group">
                            <label class="control-label col-md-2">主模块</label>
                            <div class="col-md-7">
                                <input autocomplete="off" class="form-control states typeahead tt-query" dir="auto" placeholder="主模块名称" spellcheck="false" type="text" v-model="newTestCase.parent_module_name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2">子模块</label>
                            <div class="col-md-7">
                                <input autocomplete="off" class="form-control countries typeahead tt-query" dir="auto" placeholder="子模块名称" spellcheck="false" type="text" v-model="newTestCase.child_module_name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2">测试点描述</label>
                            <div class="col-md-9">
                                <textarea class="form-control" rows="3" v-model="newTestCase.desc"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2">操作步骤</label>
                            <div class="col-md-9">
                                <textarea class="form-control" rows="3" v-model="newTestCase.steps"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2">预期结果</label>
                            <div class="col-md-9">
                                <textarea class="form-control" rows="3" v-model="newTestCase.expected"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" type="button" @click="storeTestCase">Save</button><button class="btn btn-default-outline" data-dismiss="modal" type="button">Close</button>
                </div>
            </div>
        </div>
    </div>
  </div>

  <div class="container-fluid main-content" v-if="testcases != null">
      <div class="row" style="margin: 0;">
          <!-- Bordered Table -->
          <div class="col-xs-12" style="padding: 0;margin:0;">
              <div class="widget-container fluid-height clearfix">
                  <div class="widget-content clearfix" style="overflow-x: scroll;min-height:100%;background: #e8e8e8">
                      <table class="table table-bordered table-striped table-hover table-responsive table-fixed text-center" style="margin-bottom: 0;">
                          <thead style="background: #fff">
                          <tr>
                              <th rowspan="2">
                                 编号
                              </th>
                              <th rowspan="2" colspan="2">
                                  主模块
                              </th>
                              <th rowspan="2">
                                  测试点描述
                              </th>
                              <th rowspan="2">
                                  操作步骤
                              </th>
                              <th rowspan="2">
                                  预期结果
                              </th>
                              <th colspan="3" v-for="testgroup in selectedTestGroups">
                                  {{ testgroup.name }}
                              </th>
                          </tr>
                          <tr>
                              <template v-for="testgroup in selectedTestGroups">
                                  <th>
                                      是否测试
                                  </th>
                                  <th>
                                      是否通过
                                  </th>
                                  <th>
                                      修复状况
                                  </th>
                              </template>
                          </tr>
                          </thead>
                          <tbody>
                              <tr v-for="(key, testcase) in testcases">
                                  <td>
                                      {{testcase.code}}
                                  </td>
                                  <td>
                                      {{testcase.parent_module_name}}
                                  </td>
                                  <td>
                                      {{testcase.child_module_name}}
                                  </td>
                                  <td>
                                      {{testcase.desc}}
                                  </td>
                                  <td>
                                      {{testcase.steps}}
                                  </td>
                                  <td>
                                      {{testcase.expected}}
                                  </td>
                                  <template v-for="testgroup in selectedTestGroups">
                                  <td>
                                      <div class="btn-group" v-if="isNotExist(key, testgroup) || !testgroup.result[key].isTested">
                                        <button class="btn btn-action" data-toggle="dropdown">
                                          未测试<span class="caret"></span></button>
                                        <ul class="dropdown-menu">
                                          <li>
                                            <a href="#" @click="updateTestStatus(key, testgroup, true)">测试通过</a>
                                          </li>
                                          <li>
                                            <a href="#" @click="updateTestStatus(key, testgroup, false)">测试失败</a>
                                          </li>
                                        </ul>
                                      </div>
                                      <span class="label label-success" v-else>已测试</span>
                                  </td>
                                  <td>
                                      <span v-if="isNotExist(key, testgroup) || !testgroup.result[key].isTested" class="label label-info">未测试</span>
                                      <div v-else>
                                          <span v-if="isNotExist(key, testgroup) || !testgroup.result[key].isPassed" class="label label-danger">失败</span>
                                          <span class="label label-success" v-else>通过</span>
                                      </div>
                                  </td>
                                  <td>
                                      <span v-if="isNotExist(key, testgroup) || !testgroup.result[key].isTested" class="label label-info">未测试</span>
                                      <div v-else>
                                          <span v-if="testgroup.result[key].isPassed" class="label label-info">PASS</span>
                                          <div v-else>
                                              <div class="btn-group" v-if="isNotExist(key, testgroup) || !testgroup.result[key].isFixed">
                                                  <button class="btn btn-action btn-warnning" data-toggle="dropdown">
                                                    未修复<span class="caret"></span></button>
                                                  <ul class="dropdown-menu">
                                                    <li>
                                                      <a href="#" @click="updateFixedStatus(key, testgroup, true)">成功修复</a>
                                                    </li>
                                                    <li>
                                                      <a href="#">待讨论</a>
                                                    </li>
                                                  </ul>
                                              </div>
                                              <span class="label label-success" v-else>已修复</span>
                                          </div>
                                      </div>
                                  </td>
                                  </template>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
          <!-- end Bordered Table -->
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      store: null,
      message: 'Created By JobsLong',
      projects: {},
      selectedProject: null,
      newProjet: {
        name: ''
      },
      selectedSheet: null,
      newSheet: {
        name: ''
      },
      selectedTestGroups: [],
      newTestGroup: {
        name: ''
      },
      testcases: null,
      newTestCase: {
        code: '',
        parent_module_name: '',
        child_module_name: '',
        desc: '',
        steps: '',
        expected: ''
      }
    }
  },
  ready() {
    const self = this

    this.store = new Wilddog('https://testexcel.wilddogio.com/')

    this.store.child('projects').on('value', function (snapshot) {
      self.projects = snapshot.val()
      if (_.isNull(self.projects)) return

      const first = _.pairs(self.projects)[0]
      self.selectedProject = first[1]
      self.selectedProject.key = first[0]

      self.selectProject(self.selectedProject)
    }, function (errorObject) {
      // error
      console.log(errorObject)
    })
  },
  methods: {
    isNotExist(key, testgroup) {
      return testgroup.result === null || testgroup.result[key] === undefined
    },
    storeProject() {
      if (this.newProjet.name === '') return

      const projectsRef = this.store.child('projects')
      projectsRef.push(this.newProjet)

      $('#createProjectModal').modal('hide')
    },
    storeSheet() {
      if (this.newSheet.name === '') return

      const sheetsRef = this.store.child(`projects/${this.selectedProject.key}/sheets`)
      sheetsRef.push(this.newSheet)

      $('#createSheetModal').modal('hide')
    },
    selectProject(project) {
      this.selectedProject = project

      // select first sheet
      if (_.isUndefined(this.selectedProject.sheets)) {
        this.selectedSheet = null
        this.selectedTestGroups = []
        this.testcases = null
        return
      }

      const first = _.pairs(this.selectedProject.sheets)[0]
      this.selectedSheet = first[1]
      this.selectedSheet.key = first[0]

      this.selectSheet(this.selectedSheet)
    },
    selectSheet(sheet) {
      this.selectedSheet = sheet

      // select first sheet
      if (this.selectedSheet === null || _.isUndefined(this.selectedSheet.testgroups)) {
        this.selectedTestGroups = []
      } else {
        const first = _.pairs(this.selectedSheet.testgroups)[0]
        const selectedTestGroup = first[1]
        selectedTestGroup.key = first[0]

        this.selectTestGroup(selectedTestGroup)
      }

      if (_.isUndefined(this.selectedSheet.testcases)) {
        this.testcases = null
      } else {
        this.testcases = this.selectedSheet.testcases
      }
    },
    storeTestGroup() {
      if (this.newTestGroup.name === '') return

      const testgroupsRef = this.store.child(`projects/${this.selectedProject.key}/
        sheets/${this.selectedSheet.key}/testgroups`)

      testgroupsRef.push(this.newTestGroup)

      $('#createTestGroupModal').modal('hide')
    },
    selectTestGroup(testgroup) {
      this.selectedTestGroups = []
      this.selectedTestGroups.push(testgroup)
    },
    showAllTestGroup() {
      const self = this
      self.selectedTestGroups = []
      _.map(_.values(this.selectedSheet.testgroups), function (value) {
        self.selectedTestGroups.push(value)
      })
    },
    storeTestCase() {
      const testcasesRef = this.store.child(`projects/${this.selectedProject.key}/
        sheets/${this.selectedSheet.key}/testcases`)

      testcasesRef.push(this.newTestCase)

      $('#createTestCaseModal').modal('hide')
    },
    updateTestStatus(key, testgroup, status) {
      const testgroupStatusRef = this.store.child(`projects/${this.selectedProject.key}/
        sheets/${this.selectedSheet.key}/
        testgroups/${testgroup.key}/
        result/${key}`)
      testgroupStatusRef.set({
        isTested: true,
        isPassed: status
      })
    },
    updateFixedStatus(key, testgroup, status) {
      const testgroupStatusRef = this.store.child(`projects/${this.selectedProject.key}/
        sheets/${this.selectedSheet.key}/
        testgroups/${testgroup.key}/
        result/${key}/
        isFixed`)
      testgroupStatusRef.set(status)
    }
  }
}
</script>

<style>

</style>
