/**
 * @author: wang.weili
 * @since : 2020/11/12
 * @description: 框架公共文件，慎重修改
 */
import axios from 'axios'
import {
    // Message,
    Loading,MessageBox,Notification} from 'element-ui'
// import i18n from './i18n'
var baseUrl = '/',
    token = '',
    projectCode = '',
    projectId = '',
    cmLoading,
    showLoading = false, // 是否显示加载中
    showError = true; // 是否处理请求错误

/**
 * apiConfig 配置项
 * axios headers: 
 * showLoading // 是否显示加载中，默认：false
 * showError // 是否自动处理请求错误，默认：true
 * playPassAudio // 是否播放成功音频，默认：false
 * playFailAudio // 是否播放失败音频，默认：false
 * 
 */
const MOCKMETHORDS = ['save', 'updateById', 'removeById', 'remoteListId', 'changePwd'], // 模拟接口默认返回PASS的接口名
    PAGESIZE = 10,
    pre_url = process.env.VUE_APP_PRE_URL,
    sysCode = process.env.VUE_APP_CODE,
    common_url=process.env.VUE_APP_COMMON_URL,
    user_url = 'user/api/',
    processcenter_url=process.env.VUE_APP_PROCESSCENTER_URL,
    quality_url=process.env.VUE_APP_QUALITY_URL;
var promptError = true, // 请求错误是否弹窗，false时使用消息提示框
log_url = '',
mock = false;

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['sysCode'] = "BYD_OMP";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 30 * 60 * 1000;

function getMethod(url) {
    let pathIdx = url.lastIndexOf("?");
    pathIdx = pathIdx > 0 ? pathIdx : url.length
    let arr = url.substring(0, pathIdx).split('/');
    return arr[arr.length - 2] + "/" + arr[arr.length - 1]
}

const setLangs = function(lang){
    if(lang&&lang.split('-').length)
    axios.defaults.headers.common['Accept-Language'] = lang.split('-')[0];
}
const setForMock = function() {
    axios.defaults.baseURL = process.env.BASE_URL + 'mock/';
    axios.interceptors.request.use((config) => {
        // console.log(config)
        if(config.url.startsWith('mock')){
            config.url = config.url.slice(5)
            return config
        }
        let mockUrl = getMethod(config.url).replace(/\//g, "_");
        let method = mockUrl.split('_')[1];
        if (method && MOCKMETHORDS.includes(method))
            mockUrl = 'success'
        config.url = mockUrl + '.json';
        config.method = 'get';
        return config;
    })
}
if (mock) {
    setForMock();
} else {
    // setLangs(i18n.locale);
    axios.interceptors.request.use((config) => {
        if (Api.showLoading||config.headers.showLoading) {
            cmLoading = Loading.service({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
        if(Api.mock){
            return config
        }
        // 非user类接口请求统一添加projectCode前缀
        if (!config.url.startsWith('user') && !config.url.startsWith('common') && (!config.url.startsWith('http://')) && !config.url.startsWith('processcenter')  && Api.projectCode) {
            config.url = `${Api.projectCode}/` + config.url;
        }
        return config;
    })
}
const showErrMsg = function(title, msg) {
        if(Api.promptError){
            MessageBox.alert(msg, title, {
                type: "error",
                callback: (res) => {
                    if(res=='cancel'){
                        MessageBox.closeAll()
                    }
                }
            })
        }else{
            // Message({
            //     message: title+' ,message: '+msg,
            //     type: "error",
            //     duration: 6000, // 0: 不自动关闭
            //     showClose: true
            // });
            Notification({
                title: title,
                message: msg,
                type: "error",
                duration: 6000, // 0: 不自动关闭
                position: 'bottom-right'
            })
        }
}
/**
 * promptError: 是否默认弹框报错？ 客户端或PDA设置为否
 * CODE: 0 或404,500等，服务器问题
 * CODE: -1 接口报错，RESULT:FAIL
 * CODE: -2 JSON解析错误，返回非JSON格式
 */
axios.interceptors.response.use(function(response) {
        if (cmLoading) {
            Api.showLoading = false;
            cmLoading.close()
        }
        const execErr = function() {
            if(!Api.promptError&&response.config.headers.playFailAudio==true)
            Api.playFailAudio();
            if (Api.showError&&response.config.headers.showError!==false&&response.data.CODE == -1 && response.data.MESSAGE && response.data.MESSAGE.indexOf('登录') > -1) {
                localStorage.removeItem("aSession");
                window.location.href = `${window.location.origin}${process.env.BASE_URL?process.env.BASE_URL:'/'}index.html`;
                return;
            }
            let method = getMethod(response.config.url);
            if (Api.showError&&response.config.headers.showError!==false)
                showErrMsg(method , response.data.MESSAGE);
            response.data.URL = response.config.url;
            response.data.METHOD = method;
            Api.showError = true;
            // console.log(response.data)
        }
        if (response.headers['content-type'].startsWith('application/zip')||response.headers['content-type'].startsWith('application/octet-stream')) {
            return response.data;
        }
        if (response.headers['content-type'] == 'application/msexcel' && response.headers['attachment-headers']==undefined) {
            return response.data;
        }else if (response.request.responseType == 'blob' && response.headers['attachment-headers'] && response.headers['attachment-headers'] == 'true') {
            return response;
        } else if (response.data.RESULT != "PASS") {
            // 请求responseType=blob, 但返回的是json数据： 先转换blob为json
            if (response.request.responseType == 'blob' && response.headers['content-type'].indexOf('application/json') > -1) {
                const reader = new FileReader();
                reader.readAsText(response.data, 'utf-8');
                reader.onload = function() {
                    try {
                        response.data = JSON.parse(reader.result);
                    } catch (e) {
                        response.data.CODE = -2;
                        response.data.MESSAGE = "json解析错误：" + e.toString();
                    }
                    execErr();
                }
                return Promise.reject(response.data);
            } else {
                execErr();
                return Promise.reject(response.data);
            }
        } else {
            if(!Api.promptError&&response.config.headers.playPassAudio==true)
            Api.playPassAudio();
            Api.showError = true;
            return response.data;
        }
    },
    function(error) {
        // console.log([error])
        if(!Api.promptError&&error.config.headers.playFailAudio == true)
        Api.playFailAudio();
        if (cmLoading) {
            Api.showLoading = false;
            cmLoading.close()
        }
        let code = 0,method = "";
        if (error.config)
            method = getMethod(error.config.url);
        if (error.response) {
            code = error.response.status;
        }
        if (Api.showError&&error.config.headers.showError!==false)
            showErrMsg(`code:${code}`, code == 0 ? '': error.toString())
        Api.showError = true;
        const data = {
            CODE: code,
            MESSAGE: code == 0 ? '': error.toString(),
            URL: error.config.url,
            METHOD: method
        }
        // console.log(data)
        return Promise.reject(data);
    });

const Api = {
    axios,
    baseUrl,
    pre_url,
    user_url,
    log_url,
    common_url,
    processcenter_url,
    quality_url,
    mock,
    projectCode,
    projectId,
    sysCode,
    token,
    setLangs,
    setForMock,
    showError,
    promptError,
    showLoading,
    playPassAudio(){
        let $el = document.getElementById('passAudio');
        if($el)
        $el.play();
    },
    playFailAudio(){
        let $el = document.getElementById('failAudio');
        if($el)
        $el.play();
    },
    login(data) {
        let promise = axios.post(`${user_url}login`, data);
        return promise;
    },
    getMockFile(name) {
        let promise = axios.get(`mock/${name}`);
        return promise;
    },
    // 登录页支持query.baseUrl配置baseUrl
    setBaseUrl(bl) {
        if (this.mock) {
            return false
        }
        let pattern = "^https?://(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\." +
            "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." +
            "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." +
            "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)(:\\d*)?.*(/)?$"
        if (new RegExp(pattern).test(bl) || /^https?:\/\/localhost(:\\d*)?.*(\/)?$/.test(bl) || /^https?:\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/.test(bl)) {
            this.baseUrl = bl;
            axios.defaults.baseURL = bl;
        }
    },
    setToken(token) {
        this.token = token;
        axios.defaults.headers.common['token'] = token;
    },
    setProjectId(pId) {
        this.projectId = pId;
        axios.defaults.headers.common['projectId'] = pId;
    },
    getList(url, data) {
        data = data || {}
        let promise = axios.post(`${url}/getList`, data);
        return promise;
    },
    getPage(url, data, currentPageNo, pageSize) {
        data = data || {}
        Object.assign(data, {
            "currentPageNo": currentPageNo,
            "pageSize": pageSize || PAGESIZE
        })
        let promise = axios.post(`${url}/getPage`, data);
        return promise;
    },
    getLikePage(url, data, currentPageNo, pageSize) {
        data = data || {}
        Object.assign(data, {
            "currentPageNo": currentPageNo,
            "pageSize": pageSize || PAGESIZE
        })
        let promise = axios.post(`${url}/getLikePage`, data);
        return promise;
    },
    getById(url, id, params) {
        let promise = axios.get(`${url}/getById?id=${id}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: params
        });
        return promise;
    },
    save(url, data) {
        let promise = axios.post(`${url}/save`, data);
        return promise;
    },
    updateById(url, data) {
        let promise = axios.post(`${url}/updateById`, data);
        return promise;
    },
    removeById(url, id, params) {
        let promise = axios.get(`${url}/removeById?id=${id}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: params
        });
        return promise;
    },
    getMenusTree(id) {
        let promise = axios.get(`${user_url}mesSysMenu/lazy?pid=${id}&sysCode=${this.sysCode}&projectId=1520`);
        return promise;
    },
    getUserRoles(workNo){
        let promise =  axios.get(`${user_url}mesSysRole/getListByWorkNo?workNo=${workNo}` );
        return promise;
    },

    getDict(dictType) {
        let promise = axios.get(`${common_url}sysDictData/getByDictType?dictType=${dictType}`);
		return promise;
    },
    getSuperior(ids) {
        const data = ids.length || ids.length === 0 ? ids : Array.of(ids)
        let promise = axios.post(`${user_url}mesSysMenu/getSuperior?sysCode=${this.sysCode}`, data);
        return promise;
    },
    getChildId(id) {
        let promise = axios.get(`${user_url}mesSysMenu/childId?id=${id}&sysCode=${this.sysCode}`);
        return promise;
    },
    getParentId(id) {
        let promise = axios.get(`${user_url}mesSysMenu/parentId?id=${id}`);
        return promise;
    },
    changePwd(data) {
        let promise = axios.post(`${user_url}mesSysUser/changePwd`, data);
        return promise;
    },
    validateRandomKey(data) {
        let promise = axios.post(`user/exi/resetPwd/validateRandomKey`, data);
        return promise;
    },
    resetPwd(data) {
        let promise = axios.post(`user/exi/resetPwd/resetPwd`, data);
        return promise;
    },
    getInfoList(data) {
        let promise = axios.get(`${quality_url}` + 'qualityCqaAreaOverall/getInfoList?token=' + this.token, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return promise;
    },
    getWeekDate(date) {
        let promise = axios.post(`${quality_url}/qualityCqaAreaOverall/getWeekDate?date=${date}`);
        return promise;
    },
    getBoardData(url, data, currentPageNo, pageSize) {
        data = data || {}
        Object.assign(data, {
            "currentPageNo": currentPageNo,
            "pageSize": pageSize || PAGESIZE
        })
        let promise = axios.post(`${url}/getData`, data);
        return promise;
    },
    getProjectInfoList(data) {
        let promise = axios.get(`${quality_url}` + 'qualityCqaArea/getProjectInfoList?token=' + this.token, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return promise;
    },
    getFloorListInfoList(data) {
        let promise = axios.post(`${quality_url}` + 'qualityOba/getList?token=' + this.token, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return promise;
    },
    getMonthYear(date) {
        let promise = axios.post(`${quality_url}/qualityOba/getMonthYear?date=${date}`);
        return promise;
    },
    getMonthYearDate(date) {
        let promise = axios.post(`${quality_url}/qualityXRay/getMonthYearDate?date=${date}`);
        return promise;
    },
    getProjectsInfoList(data) {
        let promise = axios.post(`${quality_url}` + 'qualityXRay/getProjectsInfoList?token=' + this.token, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return promise;
    },
    getProjectList(data) {
        let promise = axios.post(`${quality_url}` + 'qualityTA/getProjectsInfoList?token=' + this.token, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return promise;
    },
    getOrtInfoList(data) {
        let promise = axios.get(`${quality_url}` + 'qualityOrtRount/getOrtInfoList?token=' + this.token, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return promise;
    },
    getRdInfoList(data) {
        let promise = axios.get(`${quality_url}` + 'qualityOrtRd/getRdInfoList?token=' + this.token, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return promise;
    },
    getRadarInfoList(data) {
        let promise = axios.get(`${quality_url}` + 'qualityOrtRadar/getRadarInfoList?token=' + this.token, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return promise;
    },
    getActivityOption(code) {
        let promise = axios.get(`${quality_url}/mesActivityOption/getListByCode?token=${this.token}&code=${code}`)
        return promise;
    },
    removeByCode(code) {
        let promise = axios.get(`${quality_url}/mesActivityOption/removeByCode?token=${this.token}&code=${code}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return promise;
    },
    getDistinctActivityOption() {
        let promise = axios.post(`${quality_url}/mesActivityOption/getDistinctList`, {});
        return promise;
    },
    getListByCode(code){
        let promise =  axios.get(`${quality_url}mesActivityOption/getListByCode?code=${code}` );
        return promise;
    },
    getDataByName(url, data, currentPageNo, pageSize){
        let promise = axios.post(`${quality_url}mesDutyDepartment/getDataByName?token=` + this.token, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return promise;
    },
    getDisDepartmentList(model, data) {
        let promise = axios.post(`${quality_url}mesDutyDepartment/getDisDepartmentList`, data);
        return promise;
    },
    getIPQCTest() {
        let promise = axios.post(`${quality_url}/qualityIPQCTest/getIPQCTest`, {});
        return promise;
    },
    addLog(body){
        var timeNow = new Date();
        timeNow.setHours(timeNow.getHours() + 8);
        timeNow = timeNow.toJSON();
        body.time = timeNow.replace('T',' ').substring(0,19);
        if(this.baseUrl=='/'){
            body.content = `Url:${window.location.origin}/${body.traceId} `+body.content;
        }else{
            body.content = `Url:${this.baseUrl}/${body.traceId} `+body.content;
        }
        body.traceId = ""
        if(this.macAddress)
        body.mac = this.macAddress
        if(this.project.id)
        body.project = this.project.projectCode
        // appApi.addLog(body,this.log_url);

        if(this.log_url&&(body.mac||body.ip)){
            axios.create().post(`${this.log_url}log/exi/log`,body)
        }
    }
}
export default Api;