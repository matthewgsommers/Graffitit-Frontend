'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');
const app = require('../app');

const onGetPicture = function (event) {
  event.preventDefault();
  console.log(app.items);
  if (app.items.length > 0) {
    console.log(app.items);
    let firstItem = app.items.shift();
    console.log(" maybe the error is here instead?");
    ui.getPictureSuccess(firstItem);
    app.items.push(firstItem);
  } else {
    console.log("is error in onGetPicture?");
    console.log(app.items);
    console.log(app.data);
    let firstItem = app.items;
    console.log(firstItem);
    ui.getPictureSuccess(firstItem);
    app.items.push();
    console.log(firstItem);
    }
  };

const onUploadPicture = function (event) {
  event.preventDefault();
  let battle = getFormFields(event.target).battle;
    console.log(battle);
  api.uploadPicture({battle})
  .then(ui.uploadPictureSuccess)
  .catch(ui.failure);
    console.log(battle);
  $('.get-picture-button').show();
  $('.delete-btn').show();
};

const onDeletePicture = function (event) {
  event.preventDefault();
  console.log(event.target);
    let id = $(event.target).data("item");
    api.deletePicture(id)
    .then(ui.deletePictureSuccess)
    .then(api.getPicture)
    .then(data => app.items = data)
    .then((data)=>{
      app.items = data;
      if (app.items.length > 0) {
        console.log("This shouldnt fire");
        let firstItem = app.items.shift();
        ui.getPictureSuccess(firstItem);
        app.items.push(firstItem);
      } else {
        alert('there are no items to get!');
      }
    })
    .catch(ui.failure);
    $('.graffiti-one-container').hide();
};

const onCommentPicture = function (event) {
  event.preventDefault();
  console.log(event.target);
  let id = $(event.target).data("item");
  console.log(id);
    let commentField = getFormFields(event.target);
    api.commentPicture(id, commentField)
    .then(api.getPicture)
    .then(data => app.items = data)
    .then((data)=>{
      app.items = data;
      let firstItem = app.items.shift();
      ui.getPictureSuccess(firstItem);
      app.items.push(firstItem);
    })
    .catch(ui.failure);
};

const addHandlers = () => {
  api.getPicture().then(data => app.items = data);
  $('#get-picture-form').on('submit', onGetPicture);
  $('#upload-picture-form').on('submit', onUploadPicture);
  $(document).on('submit', '#delete-btn-form', onDeletePicture);
  $(document).on('submit', '#comment-form', onCommentPicture);
};

module.exports = {
  addHandlers,
};
