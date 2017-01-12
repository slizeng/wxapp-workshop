import { createJob, getJobById, updateJob } from '../../utils/jobs';

const fields = [
  {
    name: 'jobName',
    tag: 'input',
    placeholder: '职位名称',
  },
  {
    name: 'address',
    tag: 'input',
    placeholder: '您所在的地点',
  },
  {
    name: 'expectAddress',
    tag: 'input',
    placeholder: '您期望的办公地点',
  },
  {
    name: 'description',
    tag: 'textarea',
    placeholder: '职位描述',
  },
];

Page({
  data: {
    fields,
    values: {},
  },

  onLoad(query){
    const id = query.id;
    if (id) {
      getJobById(id).then((job) => {
        this.setData({
          values: job,
          id
        });
      });
    }
  },

  transitionToList(){
    wx.navigateBack();
  },

  onSubmit(e){
    const values = e.detail.value;
    const id = this.data.id;
    const newJob = Object.assign({}, values, { id });
    if (id) {
      updateJob(newJob).then(() => {
        this.transitionToList();
      });
      return;
    }
    createJob(values);
    this.transitionToList();
  }
});