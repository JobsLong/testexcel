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
	                <li v-for="(key, sheet) in selectedProject.sheets" v-if="sheet.key != selectedSheet.key"><a href="#" @click="selectSheet(key, sheet)"> {{ sheet.name }}</a></li>
	                <li><a data-toggle="modal" href="#createSheetModal">新建 Sheet</a></li>
	            </ul>
	        </li>
	        <!-- Testcase Dropdown -->
	        <li v-if="selectedSheet" class="dropdown sheet">
	        	<a data-toggle="modal" href="#createTestCaseModal" @click="openCreateTestCaseModal()">
	                新建功能说明</a>
	        </li>
	        <!-- Testgroup Dropdown -->
	        <!-- <li v-if="selectedProject != null && selectedTestGroups.length == 0" class="dropdown sheet">
	            <a data-toggle="modal" href="#createTestGroupModal">新建测试组</a>
	        </li>
	        <li v-if="selectedSheet != null && selectedTestGroups.length != 0" class="dropdown sheet"><a data-toggle="dropdown" class="dropdown-toggle" href="#">
	                {{ selectedTestGroups[0].name }} <b class="caret"></b></a>
	            <ul class="dropdown-menu">
	                <li v-for="(key, testgroup) in selectedSheet.testgroups" v-if="testgroup.key != selectedTestGroups[0].key"><a href="#" @click="selectTestGroup(key, testgroup)"> {{ testgroup.name }}</a></li>
	                <li><a href="#" @click="showAllTestGroup">All Test Group</a></li>
	                <li><a data-toggle="modal" href="#createTestGroupModal">新建测试组</a></li>
	            </ul>
	        </li> -->
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
	                <button class="btn btn-primary" type="button" @click="storeSheet()">Save</button><button class="btn btn-default-outline" data-dismiss="modal" type="button">Close</button>
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
	                            <input autocomplete="off" class="form-control parent typeahead tt-query" dir="auto" placeholder="主模块名称" spellcheck="false" type="text" v-model="newTestCase.parent_module_name">
	                        </div>
	                    </div>
	                    <div class="form-group">
	                        <label class="control-label col-md-2">子模块</label>
	                        <div class="col-md-7">
	                            <input autocomplete="off" class="form-control child typeahead tt-query" dir="auto" placeholder="子模块名称" spellcheck="false" type="text" v-model="newTestCase.child_module_name">
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
				projects: [],
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
				},
				selectedTestGroups: []
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

		    var self = this
		    this.projects = []
		    _.each(_.pairs(projects), function (item) {
		    	var project = item[1]
		    	project.key = item[0]
		    	self.projects.push(project)
		    })

		    this.selectProject(this.getFirstItem(projects))
			}
		},
		methods: {
			getFirstItem (items) {
				if(_.isArray(items)) {
					return _.first(items)
				}

				var item = {}
				const first = _.first(_.pairs(items))
				item.key = first[0]
				item = first[1]
				return item
			},
			getLastItem (items) {
				if(_.isArray(items)) {
					return _.last(items)
				}

				var item = {}
				const last = _.last(_.pairs(items))
				item = last[1]
				item.key = last[0]

				return item
			},
			openCreateTestCaseModal () {
				// clear
				this.newTestCase.code = this.generateCode(this.selectedSheet.name)
				// this.newTestCase.parent_module_name = ''
				this.newTestCase.child_module_name = ''
				this.newTestCase.desc = ''
				this.newTestCase.steps = ''
				this.newTestCase.expected = ''
			},
			generateCode (name) {
				var pinyinlite = require('pinyinlite')

				var words = pinyinlite(name)
				var code = ''
				_.each(words, function (word) {
					code += word[0].toUpperCase().charAt(0)
				})

				return code + '_' + (_.keys(this.testcases).length + 1)
			},
			storeProject() {
			  if (this.newProjet.name === '') return

			  const projectsRef = this.store.child('projects')
			  projectsRef.push(this.newProjet)

			  $('#createProjectModal').modal('hide')

			  this.selectProject(this.getLastItem(this.projects))
			},
			storeSheet() {
			  if (this.newSheet.name === '') return

			  var selectedProject = this.selectedProject
			  const sheetsRef = this.store.child(`projects/${this.selectedProject.key}/sheets`)
			  sheetsRef.push(this.newSheet)

			  $('#createSheetModal').modal('hide')

			  this.selectProject(selectedProject)

			  var key = key
			  _.extend(this.newSheet, {key: key})
			  _.extend(this.selectedProject.sheets, {key: this.newSheet})
			  
			  var last = this.getLastItem(this.selectedProject.sheets)
			  this.selectSheet(last.key, last)
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

			  var first = this.getFirstItem(this.selectedProject.sheets)
			  this.selectSheet(first.key, first)

			  _.map(_.pairs(this.selectedProject.sheets), function (item) {
			  	var sheet = item[1]
			  	sheet.key = item[0]
			  	item = sheet
			  })
			},
			selectSheet(key, sheet) {
				this.selectedSheet = sheet
				this.selectedSheet.key = key

			  // select first sheet
			  if (this.selectedSheet === null || _.isUndefined(this.selectedSheet.testgroups)) {
			    this.selectedTestGroups = []
			  } else {
			    this.selectTestGroup(this.getFirstItem(this.selectedSheet.testgroups))
			  }

			  if (_.isUndefined(this.selectedSheet.testcases)) {
			    this.testcases = []
			  } else {
			    this.testcases = this.selectedSheet.testcases

			    this.buildAutoComplete(this.testcases)
			  }
			},
			buildAutoComplete (testcases) {
				var parent = []
				var child = []

				_.each(testcases, function (testcase) {
					parent.push(testcase.parent_module_name)
					child.push(testcase.child_module_name)
				})

				parent = _.uniq(parent)
				child = _.uniq(child)

				// build for auto complete
		    if ($('.typeahead').length) {
		      $(".parent.typeahead").typeahead({
		        name: "parent",
		        local: parent
		      })

		      $(".child.typeahead").typeahead({
		        name: "child",
		        local: child
		      })
		    }
			},
			storeTestGroup() {
			  if (this.newTestGroup.name === '') return

			  const testgroupsRef = this.store.child(`projects/${this.selectedProject.key}/sheets/${this.selectedSheet.key}/testgroups`)

			  testgroupsRef.push(this.newTestGroup)

			  $('#createTestGroupModal').modal('hide')
			},
			selectTestGroup(key, testgroup) {
				testgroup.key = key
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

			  var selectedProject = this.selectedProject
			  var selectedSheet = this.selectedSheet
			  testcasesRef.push(this.newTestCase)

			  $('#createTestCaseModal').modal('hide')

			  this.selectProject(selectedProject)
			  this.selectSheet(selectedSheet.key, selectedSheet)
			}
		}
	}
</script>