import {post} from "jquery"
import config from '../../Application.config';
import toastr from 'toastr';
export function getBlcoks(callback) {
    try {
        /*$.ajax({
            url: config.APIURL + "getBlocks",
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            error: function (xhr) {
                toastr.error(xhr.responseText);
            }
        });*/
        post(config.APIURL,{
            query:`{
                blocks {
                    uuid,
                    metadataId,
                    value
                  }
            }`
        }).done(resp=>{
            callback(resp.data.blocks);
        })
    } catch (e) {
        toastr.error(e);
    }

}