<template>
  <div>
    <input id="upload-input-attachment" type="file" class="file" multiple></input>
  </div>
</template>

<script>
  import CONST from '@/store/const.js'
  import manager from '@/store/manager.js'
  import utils from '@/tool/utils.js'

  export default {
    props: ['manager'],
    data() {
      return {
        next: null,
        error: null
      }
    },
    created() {
      let self = this
      utils.event.$on('TRIGGER_UPLOAD', (next, error) => {
        if ($('#upload-input-attachment').fileinput('getFilesCount') > 0) {
          if (next) {
            self.next = next
          }
          else {
            self.next = null
          }
          if (error) {
            self.error = error
          }
          else {
            self.error = null
          }
          utils.event.$emit('LOCK_SCREEN', 'lock')
          $('#upload-input-attachment').fileinput('upload')
        }
        else {
          if (next) {
            next([])
          }
        }
      })
    },
    beforeDestroy() {
      utils.event.$off('TRIGGER_UPLOAD')
    },
    mounted() {
      let self = this
      let uploadUrl = ''
      if (manager.controller.cors) {
        uploadUrl = CONST.developHost
      }
      else {
        uploadUrl = '/'
      }
      uploadUrl += 'uploadFiles'
      $('#upload-input-attachment').fileinput(
        {
          uploadUrl: uploadUrl,
          // allowedFileExtensions : null,
          // overwriteInitial: false,
          maxFilesNum: 20,
          maxFileSize: 2000000,
          // previewFileType: 'any',
          showCaption: true,
          showUpload: false,
          // showRemove: false,
          // showCancel: false,
          showClose: false,
          showBrowse: true,
          showPreview: true,
          browseOnZoneClick: false,
          // removeFromPreviewOnError: false,
          // previewFileIcon: '<i class="fa fa-file"></i>',
          browseIcon: '<i class="fa fa-paperclip"></i>',
          browseLabel: 'Attachment',
          browseClass: 'btn btn-default',
          removeIcon: '<i class="fa fa-chain-broken"></i>',
          removeLabel: 'Clear',
          removeClass: 'btn btn-default',
          cancelIcon: '<i class="fa fa-ban"></i>',
          cancelClass: 'btn btn-default',
          uploadIcon: '<i class="fa fa-upload"></i>',
          uploadClass: 'btn btn-default',
          // msgValidationErrorIcon: '<i class="fa fa-info-circle"></i>',
          fileActionSettings: {
            showRemove: true,
            removeIcon: '<i class="fa fa-trash"></i>',
            showUpload: false,
            uploadIcon: '<i class="fa fa-upload"></i>',
            showZoom: false,
            indicatorNew: ''
          },
          // slugCallback: (filename) => {
          //   return filename.replace('(', '_').replace(']', '_')
          // },
          uploadAsync: false,
          layoutTemplates: {
            actions:
              '<div class="file-actions">\n' +
                '<div class="file-footer-buttons" style="text-align: center;">\n' +
                  '{delete}' +
                '</div>\n' +
              '</div>',
            actionDelete: '<button type="button" class="kv-file-remove btn btn-default" {dataUrl} {dataKey}><i class="fa fa-trash-o"></i> Remove</button>',
            // actionUpload: ''
            preview:
              '<div class="file-preview" style="width: 100%;">\n' +
                '{close}' +
                '<div style="padding: 5px;">\n' +
                  '<div class="file-preview-thumbnails" style="font-size: 14px; overflow: hidden; width: 100%;">\n' +
                  '</div>\n' +
                  '<div class="clearfix"></div>' +
                  '<div class="file-preview-status text-center text-success"></div>\n' +
                  '<div class="kv-fileinput-error"></div>\n' +
                '</div>\n' +
              '</div>',
            main1:
              '<div class="row">\n' +
                '<div class="col-lg-12">\n' +
                  '{preview}\n' +
                  '<div class="kv-upload-progress hide"></div>\n' +
                '</div>\n' +
              '</div>\n' +
              '<div class="input-group {class}">\n' +
                '{caption}\n' +
                '<div class="input-group-btn">\n' +
                  '{remove}\n' +
                  '{cancel}\n' +
                  '{upload}\n' +
                  '{browse}\n' +
                '</div>\n' +
              '</div>'
          },
          previewTemplates: {
            image:
              '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}" style="float: left; padding-bottom: 5px; margin: 0px 5px 5px 0px; border: 0px; border-color: #fff; border-radius: 1px;">\n' +
                '<div class="kv-file-content">' +
                  '<img src="{data}" class="kv-preview-data file-preview-image" title="{caption}" alt="{caption}" ' + 'style="width: {width}; height: {height}; border-top-left-radius: 4px; border-top-right-radius: 4px;"' + '>\n' +
                '</div>\n' +
                '{footer}\n' +
              '</div>\n',
            text:
              '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}" style="float: left; padding: 5px; margin: 0px 5px 5px 0px; border: 0px; border-color: #141a1d; border-radius: 4px; box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);">\n' +
                '<div class="kv-file-content">' +
                  '<textarea class="kv-preview-data file-preview-text" title="{caption}" readonly ' + 'style="width: {width}; height: {height};"' + '>{data}</textarea>' +
                '</div>\n' +
                '{footer}\n' +
              '</div>',
            html:
              '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}" style="float: left; padding: 5px; margin: 0px 5px 5px 0px; border: 0px; border-color: #141a1d; border-radius: 4px; box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);">\n' +
                '<div class="kv-file-content">' +
                  '<div class="kv-preview-data file-preview-html" title="{caption}" ' + 'style="width: {width}; height: {height};"' + '>{data}</div>\n' +
                  '</div>\n' +
                  '{footer}\n' +
              '</div>',
            pdf:
              '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}" style="float: left; padding: 5px; margin: 0px 5px 5px 0px; border: 0px; border-color: #141a1d; border-radius: 4px; box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);">\n' +
                '<div class="kv-file-content">' +
                  '<embed class="kv-preview-data" src="{data}" width="{width}" height="{height}" type="application/pdf">\n' +
                '</div>\n' +
                '{footer}\n' +
              '</div>',
            video:
              '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}" title="{caption}" ' + 'style="float: left; padding-bottom: 5px; margin: 0px 5px 5px 0px; width: {width}; height: {height}; border: 0px; border-color: #141a1d; border-radius: 4px; box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);"' + '>\n' +
                '<div class="kv-file-content">' +
                  '<video class="kv-preview-data" width="{width}" height="{height}" controls>\n' +
                    '<source src="{data}" type="{type}">\n' +
                    '<div class="file-preview-other">\n' +
                      '<span class="{previewFileIconClass}">{previewFileIcon}</span>\n' +
                    '</div>\n' +
                  '</video>\n' +
                '</div>\n' +
                '{footer}\n' +
              '</div>\n',
            audio:
              '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}" title="{caption}" ' + 'style="float: left; padding: 5px; margin: 0px 5px 5px 0px; width: 310px; height: 160px; border: 0px; border-color: #141a1d; border-radius: 4px; box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);"' + '>\n' +
                '<div class="kv-file-content">' +
                  '<audio class="kv-preview-data" controls>\n' +
                    '<source src="{data}" type="{type}">\n' +
                    '<div class="file-preview-other">\n' +
                      '<span class="{previewFileIconClass}">{previewFileIcon}</span>\n' +
                    '</div>\n' +
                  '</audio>\n' +
                '</div>\n' +
                '{footer}\n' +
              '</div>\n',
            flash:
              '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}" title="{caption}" ' + 'style="float: left; padding-bottom: 5px; margin: 0px 5px 5px 0px; width: {width}; height: {height}; border: 0px; border-color: #141a1d; border-radius: 4px; box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);"' + '>\n' +
                '<div class="kv-file-content">' +
                  '<object type="application/x-shockwave-flash" width="{width}" height="{height}" data="{data}">\n' +
                    '<param name="controller" value="true" />\n' +
                    '<param name="allowFullScreen" value="true" />\n' +
                    '<param name="allowScriptAccess" value="always" />\n' +
                    '<param name="autoPlay" value="false" />\n' +
                    '<param name="autoStart" value="false" />\n' +
                    '<param name="quality" value="high" />\n' +
                    '<div class="file-preview-other">\n' +
                      '<span class="{previewFileIconClass}">{previewFileIcon}</span>\n' +
                    '</div>\n' +
                  '</object>\n' +
                '</div>\n' +
                '{footer}\n' +
              '</div>\n',
            object:
              '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}" title="{caption}" ' + 'style="float: left; padding: 5px; margin: 0px 5px 5px 0px; width: {width}; height: {height}; border: 0px; border-color: #141a1d; border-radius: 4px; box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);"' + '>\n' +
                '<div class="kv-file-content">' +
                  '<object class="kv-preview-data" data="{data}" type="{type}" width="{width}" height="{height}">\n' +
                    '<param name="movie" value="{caption}" />\n' +
                    '<param name="controller" value="true" />\n' +
                    '<param name="allowFullScreen" value="true" />\n' +
                    '<param name="allowScriptAccess" value="always" />\n' +
                    '<param name="autoPlay" value="false" />\n' +
                    '<param name="autoStart" value="false" />\n' +
                    '<param name="quality" value="high" />\n' +
                    '<div class="file-preview-other">\n' +
                      '<span class="{previewFileIconClass}">{previewFileIcon}</span>\n' +
                    '</div>\n' +
                  '</object>\n' +
                '</div>\n' +
                '{footer}\n' +
              '</div>',
            other:
              '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}"' + 'title="{caption}" ' + 'style="float: left; padding: 5px; margin: 0px 5px 5px 0px; width: {width}; height: {height}; border: 0px; border-color: #141a1d; border-radius: 4px; box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);"' + '>\n' +
                '<div class="kv-file-content">' +
                  '<div class="kv-preview-data file-preview-other-frame">\n' +
                    '<div class="file-preview-other">\n' +
                      '<span class="{previewFileIconClass}">{previewFileIcon}</span>\n' +
                    '</div>\n' +
                  '</div>\n' +
                '</div>\n' +
                '<div class="file-preview-other-footer">{footer}</div>\n' +
              '</div>'
          }
        }
      )
      $('#upload-input-attachment').on('filebatchuploadsuccess', (event, data, previewId, index) => {
        utils.event.$emit('LOCK_SCREEN', 'unlock')
        let form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader
        if (!response.error) {
          if (self.next) {
            self.next(response.data)
            self.next = null
            self.error = null
          }
        }
        else {
          utils.event.$emit('SHOW_MESSAGE', response.error)
          if (self.error) {
            self.error()
            self.next = null
            self.error = null
          }
        }
        $('#upload-input-attachment').fileinput('clear')
      })
      // $('#upload-input-attachment').on('fileuploaded', (event, data, previewId, index) => {
      // })
      // $('#upload-input-attachment').on('fileuploaderror', (event, numFiles, label) => {
      // })
      $('#upload-input-attachment').on('filebatchuploaderror', (event, numFiles, label) => {
        utils.event.$emit('LOCK_SCREEN', 'unlock')
        $('#upload-input-attachment').fileinput('clear')
        utils.event.$emit('SHOW_MESSAGE', 'S006')
        if (self.error) {
          self.error()
          self.next = null
          self.error = null
        }
      })
    }
  }
</script>

<style scoped>

</style>
