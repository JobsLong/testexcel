<template>
	<div class="navbar navbar-fixed-top scroll-hide">
	  <div class="container-fluid top-bar">
	    <div class="pull-right">
	      <ul class="nav navbar-nav pull-right">
	          <li class="user">
	              <a href="http://jobslong.com" target="_blank">Test + Excel = Magic Tool</a>
	          </li>
	      </ul>
	      <ul class="nav navbar-nav pull-right hidden-xs">
	          <!-- <li class="dropdown"><message-box></message-box></li> -->
	          <!-- <li class="dropdown user"><personal-center></personal-center></li> -->
	      </ul>
	    </div>
	    <ul class="nav navbar-nav">
	        <!-- Project Sheet -->
	        <li v-if="selectedProject == null" class="dropdown project"><a data-toggle="modal" href="#createProjectModal">
	            <i class="fa fa-folder-open"></i> 新建项目</a>
	        </li>
	        <li v-if="selectedProject != null" class="dropdown project"><a data-toggle="dropdown" class="dropdown-toggle" href="#">
	            <i class="fa fa-folder-open"></i> {{ selectedProject.name }}<b class="caret"></b></a>
	            <ul class="dropdown-menu">
	                <li v-for="(key, project) in projects" v-if="project.key != selectedProject.key">
	                    <a href="#" @click="selectProject(project)">{{project.name}}</a>
	                </li>
	                <li><a data-toggle="modal" href="#createProjectModal">
	                    新建项目</a>
	                </li>
	            </ul>
	        </li>
	        <!-- Sheet Dropdown -->
	        <li v-if="selectedProject != null && selectedSheet == null" class="dropdown sheet">
	            <a data-toggle="modal" href="#createSheetModal">新建 Sheet</a>
	        </li>
	        <li v-if="selectedSheet" class="dropdown sheet"><a data-toggle="dropdown" class="dropdown-toggle" href="#">
	                {{ selectedSheet.name }} <b class="caret"></b></a>
	            <ul class="dropdown-menu">
	                <li v-for="(key, sheet) in selectedProject.sheets" v-if="sheet.key != selectedSheet.key"><a href="#" @click="selectSheet(sheet)"> {{ sheet.name }}</a></li>
	                <li><a data-toggle="modal" href="#createSheetModal">新建 Sheet</a></li>
	            </ul>
	        </li>
	        <!-- Testcase Dropdown -->
	        <li v-if="selectedSheet" class="dropdown sheet">
	        	<a data-toggle="modal" href="#createTestCaseModal" @click="openCreateTestCaseModal()">
	                新建功能说明</a>
	        </li>
	        <!-- Testgroup Dropdown -->
	        <li v-if="selectedProject != null && selectedTestGroups.length == 0" class="dropdown sheet">
	            <a data-toggle="modal" href="#createTestGroupModal">新建测试组</a>
	        </li>
	        <li v-if="selectedSheet != null && selectedTestGroups.length != 0" class="dropdown sheet"><a data-toggle="dropdown" class="dropdown-toggle" href="#">
	                {{ selectedTestGroups[0].name }} <b class="caret"></b></a>
	            <ul class="dropdown-menu">
	                <li v-for="(key, testgroup) in selectedSheet.testgroups" v-if="testgroup.key != selectedTestGroups[0].key"><a href="#" @click="selectTestGroup(testgroup)"> {{ testgroup.name }}</a></li>
	                <li><a href="#" @click="showAllTestGroup">All Test Group</a></li>
	                <li><a data-toggle="modal" href="#createTestGroupModal">新建测试组</a></li>
	            </ul>
	        </li>
	    </ul>
	  </div>
	</div>

	<div class="modal fade" id="createProjectModal" aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <button aria-hidden="true" class="close" data-dismiss="modal" type="button">×</button>
	                <h4 class="modal-title">
	                    新建项目
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
	                    新建 Sheet
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
	                    新建测试组
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
	                    新建功能
	                </h4>
	            </div>
	            <div class="modal-body">
	                <form action="#" class="form-horizontal" onsubmit="return false;">
	                    <fieldset disabled="">
	                        <div class="form-group">
	                            <label class="control-label col-md-2" for="code">编码号</label>
	                            <div class="col-md-7">
	                                <input class="form-control" id="code" v-model="newTestCase.code" type="text">
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
</template>

<script>
	import messageBox from '../notify/MessageBoxDropdown'
	import personalCenter from '../user/PersonalCenterDropdown'

	export default {
		props: {
		  	store: null,
		  	testcases: [],
		  	testgroups: []
		},
		data () {
			return {
				projects: {},
				selectedProject: null,
				newProjet: {
				  name: ''
				},
				selectedSheet: null,
				newSheet: {
				  name: ''
				},
				newTestGroup: {
				  name: ''
				},
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
		components: {
			messageBox,
    		personalCenter,
		},
		ready() {
		  const self = this

		  this.store = new Wilddog('https://testexcel.wilddogio.com/')

		  this.store.child('projects').on('value', function (snapshot) {
		    self.$dispatch('projectsLoaded', snapshot.val())
		  }, function (errorObject) {
		    // error
		    console.log(errorObject)
		  })
		},
		events: {
			projectsLoaded (projects) {
		    if (_.isNull(projects)) return

		   	this.projects = projects

		    const first = _.pairs(this.projects)[0]
		    this.selectedProject = first[1]
		    this.selectedProject.key = first[0]

		    this.selectProject(this.selectedProject)
			}
		},
		methods: {
			openCreateTestCaseModal () {
				this.newTestCase.code = this.generateCode(this.selectedSheet.name)
			},
			generateCode (name) {
				var pinyinlite = require('pinyinlite')

				var words = pinyinlite(name)
				var code = ''
				_.each(words, function (word) {
					code += word[0].toUpperCase().charAt(0)
				})


				return code + '_' + (this.testcases.length + 1)
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
			    this.testcases = []
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
			    this.testcases = []
			  } else {
			    this.testcases = this.selectedSheet.testcases
			  }
			},
			storeTestGroup() {
			  if (this.newTestGroup.name === '') return

			  const testgroupsRef = this.store.child(`projects/${this.selectedProject.key}/sheets/${this.selectedSheet.key}/testgroups`)

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
			  const testcasesRef = this.store.child(`projects/${this.selectedProject.key}/sheets/${this.selectedSheet.key}/testcases`)

			  testcasesRef.push(this.newTestCase)

			  $('#createTestCaseModal').modal('hide')
			}
		}
	}
</script>