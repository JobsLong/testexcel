<template>
<div class="row" style="margin: 0;">
    <!-- Bordered Table -->
    <div class="col-xs-12" style="padding: 0;margin:0;">
        <div class="widget-container fluid-height clearfix">
            <div class="widget-content clearfix" style="overflow-x: scroll;min-height:calc(100vh - 44px);background-color:#f8f8f8">
                <table class="table table-bordered table-hover table-responsive table-fixed text-center" style="margin-bottom: 0;background: #fff">
                    <thead>
                    <tr>
                        <th rowspan="2">
                           编号
                        </th>
                        <th rowspan="2" colspan="2" style="min-width:200px;">
                            功能模块
                        </th>
                        <th rowspan="2" style="min-width:200px;">
                            功能点描述
                        </th>
                        <th rowspan="2">
                            操作步骤
                        </th>
                        <th rowspan="2">
                            预期结果
                        </th>
                        <th colspan="3" v-for="testgroup in testgroups">
                            {{ testgroup.name }}
                        </th>
                    </tr>
                    <tr>
                        <template v-for="testgroup in testgroups">
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
                        <template v-for="module in parents" track-by="$index">
                            <tr v-for="(key, testcase) in testcases | filterBy module in 'parent_module_name'" >
                                <td>
                                    {{testcase.code}}
                                </td>
                                <td v-if="$index == 0" rowspan="{{ childModuleCount(module) }}">
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
                                <template v-for="testgroup in testgroups">
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
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- end Bordered Table -->
</div>
</template>

<script>
	
export default {
  props: {
  	store: null,
  	testcases: [],
  	testgroups: []
  },
  data () {
    return {
        parents: []        
    }
  },
  ready () {
    this.$watch('testcases', function (testcases) {
        var self = this

        _.each(testcases, function (testcase) {
            self.parents.push(testcase.parent_module_name)
        })

        this.parents = _.uniq(this.parents)
    })
  },
  methods: {
    childModuleCount (parent) {
        return _.filter(_.values(this.testcases), function (testcase) {
            return testcase.parent_module_name == parent
        }).length
    },
  	isNotExist(key, testgroup) {
      return testgroup.result === null || testgroup.result[key] === undefined
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