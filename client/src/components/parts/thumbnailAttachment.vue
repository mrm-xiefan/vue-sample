<template>
  <div style="margin-bottom: 10px;">
    <input id="thumbnail-attachment" type="file" class="file" accept=".jpg, .jpeg, .png, .tif, .tiff"></input>
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
      utils.event.$on('TRIGGER_THUMBNAIL', (next, error) => {
        if ($('#thumbnail-attachment').fileinput('getFilesCount') > 0) {
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
          $('#thumbnail-attachment').fileinput('upload')
        }
        else {
          if (next) {
            next(null)
          }
        }
      })
      utils.event.$on('CHANGE_INITIAL_THUMBNAIL', (thumbnail) => {
        let list = []
        if (thumbnail) {
          list.push(thumbnail)
        }
        else {
          list.push('/static/noimage.png')
        }
        $('#thumbnail-attachment').fileinput(
          'refresh',
          {initialPreview: list}
        )
      })
    },
    beforeDestroy() {
      utils.event.$off('TRIGGER_THUMBNAIL')
      utils.event.$off('CHANGE_INITIAL_THUMBNAIL')
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
      let initialPreview = []
      $('#thumbnail-attachment').fileinput(
        {
          uploadUrl: uploadUrl,
          allowedFileExtensions : ['JPG', 'JPEG', 'PNG', 'TIF', 'TIFF'],
          // overwriteInitial: false,
          maxFilesNum: 1,
          maxFileSize: 2000000,
          initialPreview: initialPreview,
          initialPreviewAsData: true,
          overwriteInitial: true,
          // previewFileType: 'any',
          showCaption: false,
          showUpload: false,
          showRemove: false,
          // showCancel: false,
          showClose: false,
          showBrowse: true,
          browseOnZoneClick: true,
          // removeFromPreviewOnError: false,
          // previewFileIcon: '<i class="fa fa-file"></i>',
          browseIcon: '<i class="fa fa-folder-open-o"></i>',
          browseLabel: 'Browse',
          browseClass: 'btn btn-default btn-flat full-width',
          removeIcon: '<i class="fa fa-trash"></i>',
          removeLabel: 'Clear',
          removeClass: 'btn btn-default',
          cancelIcon: '<i class="fa fa-ban"></i>',
          cancelClass: 'btn btn-default',
          uploadIcon: '<i class="fa fa-upload"></i>',
          uploadClass: 'btn btn-default',
          // msgValidationErrorIcon: '<i class="fa fa-info-circle"></i>',
          fileActionSettings: {
            showRemove: false,
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
              '<div class="file-preview" style="min-height: 205px; width: 100%; border: 1px solid #ddd; border-bottom: none;">\n' +
                '{close}' +
                '<div class="{dropClass}" style="font-size: 20px; min-height: 205px; padding: 0px; border: none; height: 100%; text-align: center; vertical-align: middle;">\n' +
                  '<div class="file-preview-thumbnails" style="font-size: 14px; overflow: hidden; width: 100%;">\n' +
                  '</div>\n' +
                  '<div class="clearfix"></div>' +
                  '<div class="file-preview-status text-center text-success"></div>\n' +
                  '<div class="kv-fileinput-error"></div>\n' +
                '</div>\n' +
              '</div>',
            main1:
              '<div class="row">\n' +
                '<div class="col-lg-12" style="min-height: 205px;">\n' +
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
              '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}">\n' +
                '<div class="kv-file-content">' +
                  '<img src="{data}" class="kv-preview-data file-preview-image" title="{caption}" alt="{caption}" ' + 'style="width: 100%; height: 100%;"' + '>\n' +
                '</div>\n' +
              '</div>\n'
          }
        }
      )
      $('#thumbnail-attachment').on('filebatchuploadsuccess', (event, data, previewId, index) => {
        utils.event.$emit('LOCK_SCREEN', 'unlock')
        let form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader
        if (!response.error) {
          if (self.next) {
            self.next(response.data[0])
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
        $('#thumbnail-attachment').fileinput('clear')
      })
      // $('#thumbnail-attachment').on('fileuploaded', (event, data, previewId, index) => {
      // })
      // $('#thumbnail-attachment').on('fileuploaderror', (event, numFiles, label) => {
      // })
      $('#thumbnail-attachment').on('filebatchuploaderror', (event, numFiles, label) => {
        utils.event.$emit('LOCK_SCREEN', 'unlock')
        $('#thumbnail-attachment').fileinput('clear')
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

<style>
  .full-width {
    width: 100%;
  }
</style>
