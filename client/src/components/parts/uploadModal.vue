<template>
  <div class="modal fade in" id="upload-modal" tabindex="-1" role="dialog" aria-labelledby="uploadModalLabel" aria-hidden="true" data-show="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" id="close-upload" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title text-blue">UPLOAD FILES</h4>
        </div>
        <div class="modal-body" style="min-height: 300px;">
          <input id="upload-input" type="file" class="file" multiple></input>
        </div>
      </div>
    </div>
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
        next: null
      }
    },
    created() {
      let self = this
      utils.event.$on('SHOW_UPLOAD', (next) => {
        if (next) {
          self.next = next
        }
        else {
          self.next = null
        }
        $('#upload-modal').modal('show')
      })
    },
    beforeDestroy() {
      utils.event.$off('SHOW_UPLOAD')
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
      $('#upload-input').fileinput(
        {
          uploadUrl: uploadUrl,
          // allowedFileExtensions : null,
          // overwriteInitial: false,
          maxFilesNum: 20,
          maxFileSize: 2000000,
          // previewFileType: 'any',
          // showCaption: true,
          // showUpload: false,
          // showRemove: false,
          showCancel: false,
          showClose: false,
          showBrowse: true,
          browseOnZoneClick: true,
          // removeFromPreviewOnError: false,
          // previewFileIcon: '<i class="fa fa-file"></i>',
          browseIcon: '<i class="fa fa-folder-open-o"></i>',
          removeIcon: '<i class="fa fa-trash"></i>',
          removeClass: 'btn btn-primary',
          cancelIcon: '<i class="fa fa-ban"></i>',
          cancelClass: 'btn btn-primary',
          uploadIcon: '<i class="fa fa-upload"></i>',
          uploadClass: 'btn btn-primary',
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
            actionDelete: '<button type="button" class="kv-file-remove btn btn-primary" {dataUrl} {dataKey}><i class="fa fa-trash-o"></i> Remove</button>',
            // actionUpload: ''
            preview:
              '<div class="file-preview" style="min-height: 300px; width: 100%; border-radius: 5px; border: 1px solid #ddd; padding: 5px; margin-bottom: 5px;">\n' +
                '{close}' +
                '<div class="{dropClass}" style="font-size: 20px; min-height: 300px; padding: 5px; border: 1px dashed #aaa; border-radius: 4px; height: 100%; text-align: center; vertical-align: middle;">\n' +
                  '<div class="file-preview-thumbnails" style="font-size: 14px; overflow: hidden; width: 100%;">\n' +
                  '</div>\n' +
                  '<div class="clearfix"></div>' +
                  '<div class="file-preview-status text-center text-success"></div>\n' +
                  '<div class="kv-fileinput-error"></div>\n' +
                '</div>\n' +
              '</div>',
            main1:
              '<div class="row">\n' +
                '<div class="col-lg-12" style="min-height: 300px;">\n' +
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
              '<div class="file-preview-frame{frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}" style="float: left; padding-bottom: 5px; margin: 0px 5px 5px 0px; border: 0px; border-color: #141a1d; border-radius: 4px; box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);">\n' +
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
                  '<video class="kv-preview-data" width="100%" height="{height}" controls>\n' +
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
      $('#upload-input').on('filepreajax', (event, previewId, index) => {
        $('#close-upload').hide()
        utils.event.$emit('LOCK_SCREEN', 'lock')
      })
      // $('#upload-input').on('fileloaded', () => {
      //   let cnt = $(this).closest('.file-input').find('.file-preview-frame').size()
      //   if (cnt > 1) {
      //     for (let idx = cnt - 2; idx >= 0; idx --) {
      //       $(this).closest('.file-input').find('.file-preview-frame:eq(' + idx + ') .kv-file-remove').click()
      //     }
      //   }
      // })
      $('#upload-input').on('filebatchuploadsuccess', (event, data, previewId, index) => {
        utils.event.$emit('LOCK_SCREEN', 'unlock')
        let form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader
        if (!response.error) {
          if (self.next) {
            self.next(response.data)
            self.next = null
          }
        }
        else {
          utils.event.$emit('SHOW_MESSAGE', response.error)
        }
        $('#upload-input').fileinput('clear')
        $('#close-upload').show()
        $('#upload-modal').modal('hide')
      })
      // $('#upload-input').on('fileuploaded', (event, data, previewId, index) => {
      //   $('#close-upload').show()
      // })
      // $('#upload-input').on('fileuploaderror', (event, numFiles, label) => {
      // })
      $('#upload-input').on('fileuploaderror', (event, numFiles, label) => {
        utils.event.$emit('LOCK_SCREEN', 'unlock')
        $('#close-upload').show()
      })
      $('#upload-input').on('filebatchuploaderror', (event, numFiles, label) => {
        utils.event.$emit('LOCK_SCREEN', 'unlock')
        $('#upload-input').fileinput('clear')
        $('#close-upload').show()
        $('#upload-modal').modal('hide')
        utils.event.$emit('SHOW_MESSAGE', 'S006')
      })
    }
  }
</script>

<style scoped>

</style>
