(function() {
	var cssInjected = false,
		styles = {
			// default: "",
			// black: "",
			// white: "",
			// tiny: "",
			// tiny_black: "",
			// tiny_white: ""
			default: ".qs_main{background-color:#ddd;text-align:left;position:absolute;width:200px;font:12px sans-serif;box-shadow:5px 5px 8px rgba(0,0,0,.35);user-select:none;-webkit-user-select:none;color:#000;border:none}.qs_content{background-color:#ccc;overflow-y:auto}.qs_title_bar{background-color:#eee;user-select:none;-webkit-user-select:none;cursor:pointer;padding:5px;font-weight:700;border:none;color:#000}.qs_container{margin:5px;padding:5px;background-color:#eee;border:none;position:relative}input{font-size:12px}textarea{font-size:12px}.qs_range{-webkit-appearance:none;width:100%;padding:0;margin:0;border:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_range:focus{outline:0;border:common_border}.qs_range::-ms-track{width:100%;cursor:pointer;background:0 0;border-color:transparent;color:transparent}.qs_range::-webkit-slider-thumb{-webkit-appearance:none;height:15px;width:15px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#999;cursor:pointer;margin-top:0}.qs_range::-moz-range-thumb{height:15px;width:15px;border:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#999;cursor:pointer}.qs_range::-ms-thumb{height:15px;width:15px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#999;cursor:pointer;border:none}.qs_range::-webkit-slider-runnable-track{width:100%;height:15px;cursor:pointer;background:#ccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-webkit-slider-runnable-track{background:#ccc}.qs_range::-moz-range-track{width:100%;height:15px;cursor:pointer;background:#ccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range::-ms-track{width:100%;height:15px;cursor:pointer;background:0 0;color:transparent}.qs_range::-ms-fill-lower{background:#ccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-lower{background:#ccc}.qs_range::-ms-fill-upper{background:#ccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-upper{background:#ccc}.qs_button{background-color:#f6f6f6;color:#000;height:30px;border:1px solid #aaa}.qs_button:active{background-color:#fff;border:1px solid #aaa}.qs_button:focus{border:1px solid #aaa}.qs_checkbox{cursor:pointer}.qs_checkbox input{display:none}.qs_checkbox span{height:16px;width:100%;display:block;text-indent:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALklEQVQ4T2OcOXPmfwYKACPIgLS0NLKMmDVrFsOoAaNhMJoOGBioFwZkZUWoJgApdFaxjUM1YwAAAABJRU5ErkJggg==) no-repeat}.qs_checkbox input:checked+span{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvElEQVQ4T63Tyw2EIBAA0OFKBxBL40wDRovAUACcKc1IB1zZDAkG18GYZTmSmafzgTnnMgwchoDWGlJKheGcP3JtnPceCqCUAmttSZznuYtgchsXQrgC+77DNE0kUpPbmBOoJaBOIVQylnqWgAAeKhDve/AN+EaklJBzhhgjWRoJVGTbNjiOowAIret6a+4jYIwpX8aDwLIs74C2D0IIYIyVP6Gm898m9kbVm85ljHUTf16k4VUefkwDrxk+zoUEwCt0GbUAAAAASUVORK5CYII=) no-repeat}.qs_checkbox_label{position:absolute;top:7px;left:30px}.qs_label{margin-bottom:3px;user-select:none;-webkit-user-select:none;cursor:default;font:_size sans-serif}.qs_text_input{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:100%;padding:0 0 0 5px;height:24px;border:1px inset #fff;background-color:#fff;color:#000}.qs_select{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAp0lEQVRIS+2SsQ3FIAwF7RVYhA5mgQFhFuhYhJKWL0eKxI8SGylKZ0p4+OBsHGNM+HChAiS7qkgyBKrovaLeOxhjbgtxZ+cFtgelFMg5QwgBvPd/EO5sDbKAlBLUWo/8CjmL075zDmKMj6rEKbpCqBL9aqc4ZUQAhVbInBMQUXz5Vg/WfxOktXZsWWtZLds9uIqlqaH1NFV3jdhSJA47E1CAaE8ViYp+wGiWMZ/T+cgAAAAASUVORK5CYII=) no-repeat right #f6f6f6;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:#000;width:100%;height:24px;border:1px inset #fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;padding:0 5px;-moz-outline:none}.qs_select::-ms-expand{display:none}.qs_number{height:24px}.qs_image{width:100%}.qs_progress{width:100%;height:15px;background-color:#ccc;border:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_progress_value{height:100%;background-color:#999}.qs_textarea{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;resize:vertical;width:100%;padding:3px 5px;border:1px inset #fff;background-color:#fff;color:#000}.qs_color{visibility:hidden;position:absolute}.qs_color_label{width:100%;height:20px;display:block;border:1px solid #aaa;cursor:pointer;padding:0 0 0 5px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}",
			black: ".qs_main{background-color:#000;text-align:left;position:absolute;width:200px;font:12px sans-serif;box-shadow:none;user-select:none;-webkit-user-select:none;color:#bbb;border:1px solid #666}.qs_content{background-color:#000;overflow-y:auto}.qs_title_bar{background-color:#000;user-select:none;-webkit-user-select:none;cursor:pointer;padding:5px;font-weight:700;border:none;color:#bbb}.qs_container{margin:5px;padding:5px;background-color:#000;border:1px solid #666;position:relative}input{font-size:12px}textarea{font-size:12px}.qs_range{-webkit-appearance:none;width:100%;padding:0;margin:0;border:1px solid #666;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_range:focus{outline:0;border:common_border}.qs_range::-ms-track{width:100%;cursor:pointer;background:0 0;border-color:transparent;color:transparent}.qs_range::-webkit-slider-thumb{-webkit-appearance:none;height:15px;width:15px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#666;cursor:pointer;margin-top:0}.qs_range::-moz-range-thumb{height:15px;width:15px;border:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#666;cursor:pointer}.qs_range::-ms-thumb{height:15px;width:15px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#666;cursor:pointer;border:none}.qs_range::-webkit-slider-runnable-track{width:100%;height:15px;cursor:pointer;background:#000;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-webkit-slider-runnable-track{background:#000}.qs_range::-moz-range-track{width:100%;height:15px;cursor:pointer;background:#000;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range::-ms-track{width:100%;height:15px;cursor:pointer;background:0 0;color:transparent}.qs_range::-ms-fill-lower{background:#000;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-lower{background:#000}.qs_range::-ms-fill-upper{background:#000;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-upper{background:#000}.qs_button{background-color:#000;color:#bbb;height:30px;border:1px solid #666}.qs_button:active{background-color:#333;border:1px solid #666}.qs_button:focus{border:1px solid #666}.qs_checkbox{cursor:pointer}.qs_checkbox input{display:none}.qs_checkbox span{height:16px;width:100%;display:block;text-indent:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALklEQVQ4T2NMS0v7z0ABYAQZMGvWLLKMSEtLYxg1YDQMRtMBAwP1woCsrAjVBAB1700hDp2I2AAAAABJRU5ErkJggg==) no-repeat}.qs_checkbox input:checked+span{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvklEQVQ4T63Tyw2EIBAA0OFKCSCdeaYAoAy1AM52JrTAlc2QYHAdjFmWo5l5zgeY1jrDwGEIeO+Bc16YlNIj18ZpraEA+76DMaYkbtvWRTC5jZvn+QoopeA4DhKpyW3MCdQWUKcQKhlbPVtAAA8ViN978A34RkIIwBgDKSXZGglUxFoL0zSVymKMsCzLbbiPgHMOhBClAqxkXdd3QDsH/HPOuVRCbee/Q+ytqredyxrrTfz5Ig1f5eHHNPCa4QMbS/ghxbi89AAAAABJRU5ErkJggg==) no-repeat}.qs_checkbox_label{position:absolute;top:7px;left:30px}.qs_label{margin-bottom:3px;user-select:none;-webkit-user-select:none;cursor:default;font:_size sans-serif}.qs_text_input{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:100%;padding:0 0 0 5px;height:24px;border:1px solid #666;background-color:#000;color:#bbb}.qs_select{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAn0lEQVRIS+2SwQ3AIAhFPzM4iUe3cTS38eYmzmDzm5jYpgWTpjc4Cv4PDwTAwI8hbmDRdUQWITii74hCCOi9PwppuflB3UFKCTlnlFJQa72YaLm1UDWgOIUYq8kU5zuNmXsL84ruJhTi2444a0yDKTgnGWNARMzOt3awjs2uY4yneGtNxbK9gztXXg3j7aqe9rCFyDx2pcANTHqOyER0AGnMUQHV+W35AAAAAElFTkSuQmCC) no-repeat right #000;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:#bbb;width:100%;height:24px;border:1px solid #666;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;padding:0 5px;-moz-outline:none}.qs_select::-ms-expand{display:none}.qs_number{height:24px}.qs_image{width:100%}.qs_progress{width:100%;height:15px;background-color:#000;border:1px solid #666;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_progress_value{height:100%;background-color:#222}.qs_textarea{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;resize:vertical;width:100%;padding:3px 5px;border:1px solid #666;background-color:#000;color:#bbb}.qs_color{visibility:hidden;position:absolute}.qs_color_label{width:100%;height:20px;display:block;border:1px solid #666;cursor:pointer;padding:0 0 0 5px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}",
			white: ".qs_main{background-color:#fff;text-align:left;position:absolute;width:200px;font:12px sans-serif;box-shadow:none;user-select:none;-webkit-user-select:none;color:#333;border:1px solid #999}.qs_content{background-color:#fff;overflow-y:auto}.qs_title_bar{background-color:#fff;user-select:none;-webkit-user-select:none;cursor:pointer;padding:5px;font-weight:700;border:none;color:#333}.qs_container{margin:5px;padding:5px;background-color:#fff;border:1px solid #999;position:relative}input{font-size:12px}textarea{font-size:12px}.qs_range{-webkit-appearance:none;width:100%;padding:0;margin:0;border:1px solid #999;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_range:focus{outline:0;border:common_border}.qs_range::-ms-track{width:100%;cursor:pointer;background:0 0;border-color:transparent;color:transparent}.qs_range::-webkit-slider-thumb{-webkit-appearance:none;height:15px;width:15px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#ccc;cursor:pointer;margin-top:0}.qs_range::-moz-range-thumb{height:15px;width:15px;border:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#ccc;cursor:pointer}.qs_range::-ms-thumb{height:15px;width:15px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#ccc;cursor:pointer;border:none}.qs_range::-webkit-slider-runnable-track{width:100%;height:15px;cursor:pointer;background:#fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-webkit-slider-runnable-track{background:#fff}.qs_range::-moz-range-track{width:100%;height:15px;cursor:pointer;background:#fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range::-ms-track{width:100%;height:15px;cursor:pointer;background:0 0;color:transparent}.qs_range::-ms-fill-lower{background:#fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-lower{background:#fff}.qs_range::-ms-fill-upper{background:#fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-upper{background:#fff}.qs_button{background-color:#fff;color:#333;height:30px;border:1px solid #999}.qs_button:active{background-color:#ccc;border:1px solid #999}.qs_button:focus{border:1px solid #999}.qs_checkbox{cursor:pointer}.qs_checkbox input{display:none}.qs_checkbox span{height:16px;width:100%;display:block;text-indent:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALklEQVQ4T2OcOXPmfwYKACPIgLS0NLKMmDVrFsOoAaNhMJoOGBioFwZkZUWoJgApdFaxjUM1YwAAAABJRU5ErkJggg==) no-repeat}.qs_checkbox input:checked+span{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvElEQVQ4T63Tyw2EIBAA0OFKBxBL40wDRovAUACcKc1IB1zZDAkG18GYZTmSmafzgTnnMgwchoDWGlJKheGcP3JtnPceCqCUAmttSZznuYtgchsXQrgC+77DNE0kUpPbmBOoJaBOIVQylnqWgAAeKhDve/AN+EaklJBzhhgjWRoJVGTbNjiOowAIret6a+4jYIwpX8aDwLIs74C2D0IIYIyVP6Gm898m9kbVm85ljHUTf16k4VUefkwDrxk+zoUEwCt0GbUAAAAASUVORK5CYII=) no-repeat}.qs_checkbox_label{position:absolute;top:7px;left:30px}.qs_label{margin-bottom:3px;user-select:none;-webkit-user-select:none;cursor:default;font:_size sans-serif}.qs_text_input{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:100%;padding:0 0 0 5px;height:24px;border:1px solid #999;background-color:#fff;color:#333}.qs_select{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAApklEQVRIS+2UwQ2AIAxF2wEYgguMAaPDGHBhCAbAlMQEjbYkxls5wrcPXhtxjDHgx4UKkOyqIskQqKLvinrvYIx5LMSdnR+wPSilQM4ZQgjgvb9AuLM1yAJSSlBrnfkVchanfeccxBhfVYlTdIdQJXrVTnHKiAAKrRD6+SKiePOtHqzvJkhrbW5Za1kt2z24i6WpofU2VU+N2FIkDjsTUIBoTxWJig7pMJi50zaHaQAAAABJRU5ErkJggg==) no-repeat right #fff;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:#333;width:100%;height:24px;border:1px solid #999;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;padding:0 5px;-moz-outline:none}.qs_select::-ms-expand{display:none}.qs_number{height:24px}.qs_image{width:100%}.qs_progress{width:100%;height:15px;background-color:#eee;border:1px solid #999;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_progress_value{height:100%;background-color:#aaa}.qs_textarea{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;resize:vertical;width:100%;padding:3px 5px;border:1px solid #999;background-color:#fff;color:#333}.qs_color{visibility:hidden;position:absolute}.qs_color_label{width:100%;height:20px;display:block;border:1px solid #999;cursor:pointer;padding:0 0 0 5px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}",
			tiny: ".qs_main{background-color:#ddd;text-align:left;position:absolute;width:160px;font:10px sans-serif;box-shadow:5px 5px 8px rgba(0,0,0,.35);user-select:none;-webkit-user-select:none;color:#000;border:none}.qs_content{background-color:#ccc;overflow-y:auto}.qs_title_bar{background-color:#eee;user-select:none;-webkit-user-select:none;cursor:pointer;padding:5px;font-weight:700;border:none;color:#000}.qs_container{margin:2px;padding:2px;background-color:#eee;border:none;position:relative}input{font-size:10px}textarea{font-size:10px}.qs_range{-webkit-appearance:none;width:100%;padding:0;margin:0;border:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_range:focus{outline:0;border:common_border}.qs_range::-ms-track{width:100%;cursor:pointer;background:0 0;border-color:transparent;color:transparent}.qs_range::-webkit-slider-thumb{-webkit-appearance:none;height:10px;width:10px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#999;cursor:pointer;margin-top:0}.qs_range::-moz-range-thumb{height:10px;width:10px;border:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#999;cursor:pointer}.qs_range::-ms-thumb{height:10px;width:10px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#999;cursor:pointer;border:none}.qs_range::-webkit-slider-runnable-track{width:100%;height:10px;cursor:pointer;background:#ccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-webkit-slider-runnable-track{background:#ccc}.qs_range::-moz-range-track{width:100%;height:10px;cursor:pointer;background:#ccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range::-ms-track{width:100%;height:10px;cursor:pointer;background:0 0;color:transparent}.qs_range::-ms-fill-lower{background:#ccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-lower{background:#ccc}.qs_range::-ms-fill-upper{background:#ccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-upper{background:#ccc}.qs_button{background-color:#f6f6f6;color:#000;height:20px;border:1px solid #aaa}.qs_button:active{background-color:#fff;border:1px solid #aaa}.qs_button:focus{border:1px solid #aaa}.qs_checkbox{cursor:pointer}.qs_checkbox input{display:none}.qs_checkbox span{height:16px;width:100%;display:block;text-indent:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALklEQVQ4T2OcOXPmfwYKACPIgLS0NLKMmDVrFsOoAaNhMJoOGBioFwZkZUWoJgApdFaxjUM1YwAAAABJRU5ErkJggg==) no-repeat}.qs_checkbox input:checked+span{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvElEQVQ4T63Tyw2EIBAA0OFKBxBL40wDRovAUACcKc1IB1zZDAkG18GYZTmSmafzgTnnMgwchoDWGlJKheGcP3JtnPceCqCUAmttSZznuYtgchsXQrgC+77DNE0kUpPbmBOoJaBOIVQylnqWgAAeKhDve/AN+EaklJBzhhgjWRoJVGTbNjiOowAIret6a+4jYIwpX8aDwLIs74C2D0IIYIyVP6Gm898m9kbVm85ljHUTf16k4VUefkwDrxk+zoUEwCt0GbUAAAAASUVORK5CYII=) no-repeat}.qs_checkbox_label{position:absolute;top:5px;left:24px}.qs_label{margin-bottom:3px;user-select:none;-webkit-user-select:none;cursor:default;font:_size sans-serif}.qs_text_input{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:100%;padding:0 0 0 5px;height:18px;border:1px inset #fff;background-color:#fff;color:#000}.qs_select{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAp0lEQVRIS+2SsQ3FIAwF7RVYhA5mgQFhFuhYhJKWL0eKxI8SGylKZ0p4+OBsHGNM+HChAiS7qkgyBKrovaLeOxhjbgtxZ+cFtgelFMg5QwgBvPd/EO5sDbKAlBLUWo/8CjmL075zDmKMj6rEKbpCqBL9aqc4ZUQAhVbInBMQUXz5Vg/WfxOktXZsWWtZLds9uIqlqaH1NFV3jdhSJA47E1CAaE8ViYp+wGiWMZ/T+cgAAAAASUVORK5CYII=) no-repeat right #f6f6f6;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:#000;width:100%;height:18px;border:1px inset #fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;padding:0 5px;-moz-outline:none}.qs_select::-ms-expand{display:none}.qs_number{height:18px}.qs_image{width:100%}.qs_progress{width:100%;height:10px;background-color:#ccc;border:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_progress_value{height:100%;background-color:#999}.qs_textarea{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;resize:vertical;width:100%;padding:3px 5px;border:1px inset #fff;background-color:#fff;color:#000}.qs_color{visibility:hidden;position:absolute}.qs_color_label{width:100%;height:20px;display:block;border:1px solid #aaa;cursor:pointer;padding:0 0 0 5px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}",
			tiny_black: ".qs_main{background-color:#000;text-align:left;position:absolute;width:160px;font:10px sans-serif;box-shadow:none;user-select:none;-webkit-user-select:none;color:#bbb;border:1px solid #666}.qs_content{background-color:#000;overflow-y:auto}.qs_title_bar{background-color:#000;user-select:none;-webkit-user-select:none;cursor:pointer;padding:5px;font-weight:700;border:none;color:#bbb}.qs_container{margin:2px;padding:2px;background-color:#000;border:1px solid #666;position:relative}input{font-size:10px}textarea{font-size:10px}.qs_range{-webkit-appearance:none;width:100%;padding:0;margin:0;border:1px solid #666;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_range:focus{outline:0;border:common_border}.qs_range::-ms-track{width:100%;cursor:pointer;background:0 0;border-color:transparent;color:transparent}.qs_range::-webkit-slider-thumb{-webkit-appearance:none;height:10px;width:10px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#666;cursor:pointer;margin-top:0}.qs_range::-moz-range-thumb{height:10px;width:10px;border:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#666;cursor:pointer}.qs_range::-ms-thumb{height:10px;width:10px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#666;cursor:pointer;border:none}.qs_range::-webkit-slider-runnable-track{width:100%;height:10px;cursor:pointer;background:#000;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-webkit-slider-runnable-track{background:#000}.qs_range::-moz-range-track{width:100%;height:10px;cursor:pointer;background:#000;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range::-ms-track{width:100%;height:10px;cursor:pointer;background:0 0;color:transparent}.qs_range::-ms-fill-lower{background:#000;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-lower{background:#000}.qs_range::-ms-fill-upper{background:#000;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-upper{background:#000}.qs_button{background-color:#000;color:#bbb;height:20px;border:1px solid #666}.qs_button:active{background-color:#333;border:1px solid #666}.qs_button:focus{border:1px solid #666}.qs_checkbox{cursor:pointer}.qs_checkbox input{display:none}.qs_checkbox span{height:16px;width:100%;display:block;text-indent:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALklEQVQ4T2NMS0v7z0ABYAQZMGvWLLKMSEtLYxg1YDQMRtMBAwP1woCsrAjVBAB1700hDp2I2AAAAABJRU5ErkJggg==) no-repeat}.qs_checkbox input:checked+span{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvklEQVQ4T63Tyw2EIBAA0OFKCSCdeaYAoAy1AM52JrTAlc2QYHAdjFmWo5l5zgeY1jrDwGEIeO+Bc16YlNIj18ZpraEA+76DMaYkbtvWRTC5jZvn+QoopeA4DhKpyW3MCdQWUKcQKhlbPVtAAA8ViN978A34RkIIwBgDKSXZGglUxFoL0zSVymKMsCzLbbiPgHMOhBClAqxkXdd3QDsH/HPOuVRCbee/Q+ytqredyxrrTfz5Ig1f5eHHNPCa4QMbS/ghxbi89AAAAABJRU5ErkJggg==) no-repeat}.qs_checkbox_label{position:absolute;top:5px;left:24px}.qs_label{margin-bottom:3px;user-select:none;-webkit-user-select:none;cursor:default;font:_size sans-serif}.qs_text_input{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:100%;padding:0 0 0 5px;height:18px;border:1px solid #666;background-color:#000;color:#bbb}.qs_select{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAn0lEQVRIS+2SwQ3AIAhFPzM4iUe3cTS38eYmzmDzm5jYpgWTpjc4Cv4PDwTAwI8hbmDRdUQWITii74hCCOi9PwppuflB3UFKCTlnlFJQa72YaLm1UDWgOIUYq8kU5zuNmXsL84ruJhTi2444a0yDKTgnGWNARMzOt3awjs2uY4yneGtNxbK9gztXXg3j7aqe9rCFyDx2pcANTHqOyER0AGnMUQHV+W35AAAAAElFTkSuQmCC) no-repeat right #000;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:#bbb;width:100%;height:18px;border:1px solid #666;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;padding:0 5px;-moz-outline:none}.qs_select::-ms-expand{display:none}.qs_number{height:18px}.qs_image{width:100%}.qs_progress{width:100%;height:10px;background-color:#000;border:1px solid #666;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_progress_value{height:100%;background-color:#222}.qs_textarea{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;resize:vertical;width:100%;padding:3px 5px;border:1px solid #666;background-color:#000;color:#bbb}.qs_color{visibility:hidden;position:absolute}.qs_color_label{width:100%;height:20px;display:block;border:1px solid #666;cursor:pointer;padding:0 0 0 5px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}",
			tiny_white: ".qs_main{background-color:#fff;text-align:left;position:absolute;width:160px;font:10px sans-serif;box-shadow:none;user-select:none;-webkit-user-select:none;color:#333;border:1px solid #999}.qs_content{background-color:#fff;overflow-y:auto}.qs_title_bar{background-color:#fff;user-select:none;-webkit-user-select:none;cursor:pointer;padding:5px;font-weight:700;border:none;color:#333}.qs_container{margin:2px;padding:2px;background-color:#fff;border:1px solid #999;position:relative}input{font-size:10px}textarea{font-size:10px}.qs_range{-webkit-appearance:none;width:100%;padding:0;margin:0;border:1px solid #999;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_range:focus{outline:0;border:common_border}.qs_range::-ms-track{width:100%;cursor:pointer;background:0 0;border-color:transparent;color:transparent}.qs_range::-webkit-slider-thumb{-webkit-appearance:none;height:10px;width:10px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#ccc;cursor:pointer;margin-top:0}.qs_range::-moz-range-thumb{height:10px;width:10px;border:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#ccc;cursor:pointer}.qs_range::-ms-thumb{height:10px;width:10px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#ccc;cursor:pointer;border:none}.qs_range::-webkit-slider-runnable-track{width:100%;height:10px;cursor:pointer;background:#fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-webkit-slider-runnable-track{background:#fff}.qs_range::-moz-range-track{width:100%;height:10px;cursor:pointer;background:#fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range::-ms-track{width:100%;height:10px;cursor:pointer;background:0 0;color:transparent}.qs_range::-ms-fill-lower{background:#fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-lower{background:#fff}.qs_range::-ms-fill-upper{background:#fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-upper{background:#fff}.qs_button{background-color:#fff;color:#333;height:20px;border:1px solid #999}.qs_button:active{background-color:#ccc;border:1px solid #999}.qs_button:focus{border:1px solid #999}.qs_checkbox{cursor:pointer}.qs_checkbox input{display:none}.qs_checkbox span{height:16px;width:100%;display:block;text-indent:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALklEQVQ4T2OcOXPmfwYKACPIgLS0NLKMmDVrFsOoAaNhMJoOGBioFwZkZUWoJgApdFaxjUM1YwAAAABJRU5ErkJggg==) no-repeat}.qs_checkbox input:checked+span{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvElEQVQ4T63Tyw2EIBAA0OFKBxBL40wDRovAUACcKc1IB1zZDAkG18GYZTmSmafzgTnnMgwchoDWGlJKheGcP3JtnPceCqCUAmttSZznuYtgchsXQrgC+77DNE0kUpPbmBOoJaBOIVQylnqWgAAeKhDve/AN+EaklJBzhhgjWRoJVGTbNjiOowAIret6a+4jYIwpX8aDwLIs74C2D0IIYIyVP6Gm898m9kbVm85ljHUTf16k4VUefkwDrxk+zoUEwCt0GbUAAAAASUVORK5CYII=) no-repeat}.qs_checkbox_label{position:absolute;top:5px;left:24px}.qs_label{margin-bottom:3px;user-select:none;-webkit-user-select:none;cursor:default;font:_size sans-serif}.qs_text_input{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:100%;padding:0 0 0 5px;height:18px;border:1px solid #999;background-color:#fff;color:#333}.qs_select{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAApklEQVRIS+2UwQ2AIAxF2wEYgguMAaPDGHBhCAbAlMQEjbYkxls5wrcPXhtxjDHgx4UKkOyqIskQqKLvinrvYIx5LMSdnR+wPSilQM4ZQgjgvb9AuLM1yAJSSlBrnfkVchanfeccxBhfVYlTdIdQJXrVTnHKiAAKrRD6+SKiePOtHqzvJkhrbW5Za1kt2z24i6WpofU2VU+N2FIkDjsTUIBoTxWJig7pMJi50zaHaQAAAABJRU5ErkJggg==) no-repeat right #fff;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:#333;width:100%;height:18px;border:1px solid #999;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;padding:0 5px;-moz-outline:none}.qs_select::-ms-expand{display:none}.qs_number{height:18px}.qs_image{width:100%}.qs_progress{width:100%;height:10px;background-color:#eee;border:1px solid #999;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_progress_value{height:100%;background-color:#aaa}.qs_textarea{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;resize:vertical;width:100%;padding:3px 5px;border:1px solid #999;background-color:#fff;color:#333}.qs_color{visibility:hidden;position:absolute}.qs_color_label{width:100%;height:20px;display:block;border:1px solid #999;cursor:pointer;padding:0 0 0 5px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}"
		},
		chosenStyle = "default";

	function injectCSS() {
		var qs_Styles = document.getElementById("qs_styles");
		if(qs_Styles) {
			document.head.removeChild(qs_Styles);
		}
		if(chosenStyle != "custom") {
			var styleTag = document.createElement("style");
			styleTag.id = "qs_styles";
			styleTag.innerText = styles[chosenStyle]
			document.head.appendChild(styleTag);
		}
		cssInjected = true;
	}

	var QuickSettings = {
		_version: "1.6",
		_topZ: 1,

		_panel: null,
		_titleBar: null,
		_content: null,
		_startX: 0,
		_startY: 0,
		_hidden: false,
		_collapsed: false,
		_controls: null,
		_keyCode: -1,
		_draggable: true,
		_collapsible: true,
		_snapToGrid: false,
		_gridSize: 40,
		_globalChangeHandler: null,

		setStyle: function(style) {
			chosenStyle = style || "default";
			injectCSS();
		},

		create: function(x, y, title) {
			var obj = Object.create(this);
			obj._init(x, y, title);
			return obj;
		},

		destroy: function() {
			document.body.removeChild(this._panel);
			for(var prop in this) {
				this[prop] = null;
			}
		},

		_init: function(x, y, title) {
			if(!cssInjected) {
				injectCSS();
			}
			this._bindHandlers();
			this._createPanel(x, y);
			this._createTitleBar(title || "QuickSettings");
			this._createContent();

			document.body.appendChild(this._panel);
		},

		_bindHandlers: function() {
			this._startDrag = this._startDrag.bind(this);
			this._drag = this._drag.bind(this);
			this._endDrag = this._endDrag.bind(this);
			this._doubleClickTitle = this._doubleClickTitle.bind(this);
			this._onKeyUp = this._onKeyUp.bind(this);
		},

		_createPanel: function(x, y) {
			this._panel = document.createElement("div");
			this._panel.className = "qs_main";
			this._panel.style.zIndex = ++QuickSettings._topZ;
			this.setPosition(x || 0, y || 0);
			this._controls = {};
		},

		_createTitleBar: function(text) {
			this._titleBar = document.createElement("div");
			this._titleBar.textContent = text;
			this._titleBar.className = "qs_title_bar";

			this._titleBar.addEventListener("mousedown", this._startDrag);
			this._titleBar.addEventListener("dblclick", this._doubleClickTitle);

			this._panel.appendChild(this._titleBar);
		},

		_createContent: function() {
			this._content = document.createElement("div");
			this._content.className = "qs_content";
			this._panel.appendChild(this._content);
		},

		setPosition: function(x, y) {
			this._panel.style.left = x + "px";
			this._panel.style.top = Math.max(y, 0) + "px";
			return this;
		},

		setSize: function(w, h) {
			this._panel.style.width = w + "px";
			this._content.style.width = w + "px";
			this._content.style.height = (h - this._titleBar.offsetHeight) + "px";
			return this;
		},

		setWidth: function(w) {
			this._panel.style.width = w + "px";
			this._content.style.width = w + "px";
			return this;
		},

		setDraggable: function(draggable) {
			this._draggable = draggable;
			if(this._draggable || this._collapsible) {
				this._titleBar.style.cursor = "pointer";
			}
			else {
				this._titleBar.style.cursor = "default";
			}
			return this;
		},

		setCollapsible: function(collapsible) {
			this._collapsible = collapsible;
			if(this._draggable || this._collapsible) {
				this._titleBar.style.cursor = "pointer";
			}
			else {
				this._titleBar.style.cursor = "default";
			}
			return this;
		},

		setSnapToGrid: function(value) {
			this._snapToGrid = value;
			return this;
		},

		setGridSize: function(value) {
			this._gridSize = value;
			return this;
		},

		_startDrag: function(event) {
			if(this._draggable) {
				this._panel.style.zIndex = ++QuickSettings._topZ;
				document.addEventListener("mousemove", this._drag);
				document.addEventListener("mouseup", this._endDrag);
				this._startX = event.clientX;
				this._startY = event.clientY;
			}
			event.preventDefault();
		},

		_drag: function(event) {
			var x = parseInt(this._panel.style.left),
				y = parseInt(this._panel.style.top),
				mouseX = event.clientX,
				mouseY = event.clientY;

			this.setPosition(x + mouseX - this._startX, y + mouseY - this._startY);
			this._startX = mouseX;
			this._startY = mouseY;
			event.preventDefault();
		},

		_endDrag: function(event) {
			if(this._snapToGrid) {
				var x = parseInt(this._panel.style.left),
					y = parseInt(this._panel.style.top),
					mouseX = event.clientX,
					mouseY = event.clientY;
				x = x + mouseX - this._startX;
				y = y + mouseY - this._startY;

				x = Math.round(x / this._gridSize) * this._gridSize;
				y = Math.round(y / this._gridSize) * this._gridSize;
				this.setPosition(x, y);
			}
			document.removeEventListener("mousemove", this._drag);
			document.removeEventListener("mouseup", this._endDrag);
			event.preventDefault();
		},

		_doubleClickTitle: function() {
			if(this._collapsible) {
				this.toggleCollapsed();
			}
		},

		setGlobalChangeHandler: function(handler) {
			this._globalChangeHandler = handler;
			return this;
		},

		toggleCollapsed: function() {
			if(this._collapsed) {
				this.expand();
			}
			else {
				this.collapse();
			}
			return this;
		},

		collapse: function() {
			this._panel.removeChild(this._content);
			this._collapsed = true;
			return this;
		},

		expand: function() {
			this._panel.appendChild(this._content);
			this._collapsed = false;
			return this;
		},

		hide: function() {
			this._panel.style.visibility = "hidden";
			this._hidden = true;
			return this;
		},

		show: function() {
			this._panel.style.visibility = "visible";
			this._panel.style.zIndex = ++QuickSettings._topZ;
			this._hidden = false;
			return this;
		},

		_createContainer: function() {
			var container = document.createElement("div");
			container.className = "qs_container";
			return container;
		},

		_createLabel: function(title) {
			var label = document.createElement("div");
			label.innerHTML = title;
			label.className = "qs_label";
			return label;
		},

		setKey: function(char) {
			this._keyCode = char.toUpperCase().charCodeAt(0);
			document.body.addEventListener("keyup", this.onKeyUp);
			return this;
		},

		_onKeyUp: function(event) {
			if(event.keyCode === this._keyCode) {
				this.toggleVisibility();
			}
		},

		toggleVisibility: function() {
			if(this._hidden) {
				this.show();
			}
			else {
				this.hide();
			}
			return this;
		},

		bindRange: function(title, min, max, value, step, object) {
			this.addRange(title, min, max, value, step, function(value) {
				object[title] = value;
			});
			return this;
		},

		bindNumber: function(title, min, max, value, step, object) {
			this.addNumber(title, min, max, value, step, function(value) {
				object[title] = value;
			});
			return this;
		},

		addRange: function(title, min, max, value, step, callback) {
			this._addNumber("range", title, min, max, value, step, callback);
			return this;
		}, 

		addNumber: function(title, min, max, value, step, callback) {
			this._addNumber("number", title, min, max, value, step, callback);
			return this;
		}, 

		_isIE: function() {
			if(navigator.userAgent.indexOf("rv:11") != -1) {
				return true;
			}
			if(navigator.userAgent.indexOf("MSIE") != -1) {
				return true;
			}
			return false;
		},

		_isSafari: function() {
			var userAgent = navigator.userAgent.toLowerCase();
			if(userAgent.indexOf("chrome") > -1 ||
				userAgent.indexOf("firefox") > -1 ||
				userAgent.indexOf("epiphany") > -1) {
				return false;
			}
			if(userAgent.indexOf('safari/') > -1) {
				return true;
			}
			return false;
		},

		_isEdge: function() {
			var userAgent = navigator.userAgent.toLowerCase();
			return userAgent.indexOf("edge") > -1;
		},

		_addNumber: function(type, title, min, max, value, step, callback) {
			var container = this._createContainer();

			var input = document.createElement("input");
			input.type = type;
			input.id = title;
			input.min = min || 0;
			input.max = max || 100;
			input.step = step || 1;
			input.value = value || 0;
			if(type === "range") {
				input.className = "qs_range";
			}
			else {
				input.className = "qs_text_input qs_number";
			}

			var label = this._createLabel("<b>" + title + ":</b> " + input.value);

			container.appendChild(label);
			container.appendChild(input);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: input,
				label: label,
				callback: callback
			};

			var eventName = "input";
			if(type === "range" && this._isIE()) {
				eventName = "change";
			}
			var gch = this._globalChangeHandler;
			input.addEventListener(eventName, function() {
				label.innerHTML = "<b>" + title + ":</b> " + input.value;
				if(callback) {
					callback(parseFloat(input.value));
				}
				if(gch) {
					gch();
				}
			});
		}, 

		getRangeValue: function(title) {
			return parseFloat(this._controls[title].control.value);
		},

		getNumberValue: function(title) {
			return parseFloat(this._controls[title].control.value);
		},

		setRangeValue: function(title, value) {
			return this.setNumberValue(title, value);
		},

		setNumberValue: function(title, value) {
			var control = this._controls[title];
			control.control.value = value;
			control.label.innerHTML = "<b>" + title + ":</b> " + control.control.value;
			if(control.callback) {
				control.callback(parseFloat(control.control.value));
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			return this;
		},

		setRangeParameters: function(title, min, max, step) {
			return this.setNumberParameters(title, min, max, step);
		},

		setNumberParameters: function(title, min, max, step) {
			var control = this._controls[title];
			control.control.min = min;
			control.control.max = max;
			control.control.step = step;
			return this;
		},

		bindBoolean: function(title, value, object) {
			this.addBoolean(title, value, function(value) {
				object[title] = value;
			});
			return this;
		},

		addBoolean: function(title, value, callback) {
			var container = this._createContainer();

			var label = document.createElement("label");
			label.className = "qs_checkbox_label";
			label.textContent = title;
			label.setAttribute("for", title);

			var checkbox = document.createElement("label");
			checkbox.className = "qs_checkbox";
			checkbox.setAttribute("for", title);

			var input = document.createElement("input")
			input.type = "checkbox";
			input.id = title;
			input.checked = value;

			checkbox.appendChild(input);

			var span = document.createElement("span");
			// span.textContent = title;
			checkbox.appendChild(span);

			container.appendChild(label);
			container.appendChild(checkbox);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: input,
				callback: callback
			};

			var gch = this._globalChangeHandler;
			input.addEventListener("change", function() {
				if(callback) {
					callback(input.checked);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		},

		getBoolean: function(title) {
			return this._controls[title].control.checked;
		},

		setBoolean: function(title, value) {
			this._controls[title].control.checked = value;
			if(this._controls[title].callback) {
				this._controls[title].callback(value);
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			return this;
		},

		addButton: function(title, callback) {
			var container = this._createContainer();

			var button = document.createElement("input");
			button.type = "button";
			button.id = title;
			button.value = title;
			button.className = "qs_button";

			container.appendChild(button);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: button
			}

			var gch = this._globalChangeHandler;
			button.addEventListener("click", function() {
				if(callback) {
					callback(button);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		},

		bindColor: function(title, color, object) {
			this.addColor(title, color, function(value) {
				object[title] = value;
			});
			return this;
		},

		addColor: function(title, color, callback) {
			if(this._isSafari() || this._isEdge()) {
				return this.addText(title, color, callback);
			}
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + ":</b> " + color);

			var colorInput = document.createElement("input");
			try {
				colorInput.type = "color";
			}
			catch(e) {
				return this.addText(title, color, callback);
			}
			colorInput.id = title;
			colorInput.value = color || "#ff0000";
			colorInput.className = "qs_color";

			var colorLabel = document.createElement("label");
			colorLabel.setAttribute("for", title);
			colorLabel.className = "qs_color_label";
			colorLabel.style.backgroundColor = colorInput.value;

			container.appendChild(label);
			container.appendChild(colorInput);
			container.appendChild(colorLabel);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: colorInput,
				label: label,
				callback: callback
			};

			var gch = this._globalChangeHandler;
			colorInput.addEventListener("input", function() {
				label.innerHTML = "<b>" + title + ":</b> " + colorInput.value;
				colorLabel.style.backgroundColor = colorInput.value;
				if(callback) {
					callback(colorInput.value);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		},

		getColor: function(title) {
			return this._controls[title].control.value;
		},

		setColor: function(title, value) {
			var control = this._controls[title];
			control.control.value = value;
			control.label.innerHTML = "<b>" + title + ":</b> " + control.control.value;
			if(control.callback) {
				control.callback(control.control.value);
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			return this;
		},

		bindText: function(title, text, object) {
			this.addText(title, text, function(value) {
				object[title] = value;
			});
			return this;
		},

		addText: function(title, text, callback) {
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>");

			var textInput = document.createElement("input");
			textInput.type = "text";
			textInput.id = title;
			textInput.value = text || "";
			textInput.className = "qs_text_input";

			container.appendChild(label);
			container.appendChild(textInput);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: textInput,
				label: label,
				callback: callback
			}

			var gch = this._globalChangeHandler;
			textInput.addEventListener("input", function() {
				if(callback) {
					callback(textInput.value);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		}, 

		addPassword: function(title, text, callback) {
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>");

			var textInput = document.createElement("input");
			textInput.type = "password";
			textInput.id = title;
			textInput.value = text || "";
			textInput.className = "qs_text_input";

			container.appendChild(label);
			container.appendChild(textInput);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: textInput,
				label: label,
				callback: callback
			}

			var gch = this._globalChangeHandler;
			textInput.addEventListener("input", function() {
				if(callback) {
					callback(textInput.value);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		}, 

		bindPassword: function(title, text, object) {
			this.addPassword(title, text, function(value) {
				object[title] = value;
			});
			return this;
		},



		addTextArea: function(title, text, callback) {
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>");

			var textInput = document.createElement("textarea");
			textInput.id = title;
			textInput.rows = 5;
			textInput.value = text || "";
			textInput.className = "qs_textarea";

			container.appendChild(label);
			container.appendChild(textInput);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: textInput,
				label: label,
				callback: callback
			}

			var gch = this._globalChangeHandler;
			textInput.addEventListener("input", function() {
				if(callback) {
					callback(textInput.value);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		}, 

		setTextAreaRows: function(title, rows) {
			this._controls[title].control.rows = rows;
			return this;
		},

		getText: function(title) {
			return this._controls[title].control.value;
		},

		setText: function(title, text) {
			var control = this._controls[title];
			control.control.value = text;
			if(control.callback) {
				control.callback(text);
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			return this;
		},

		addDate: function(title, date, callback) {
			var dateStr;
			if(date instanceof Date) {
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				if(month < 10) month = "0" + month;
				var day = date.getDate();
				dateStr = year + "-" + month + "-" + day;
			}
			else {
				dateStr = date;
			}

			if(this._isIE()) {
				return this.addText(title, dateStr, callback);
			}
			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>");

			var dateInput = document.createElement("input");
			dateInput.type = "date";
			dateInput.id = title;
			dateInput.value = dateStr || "";
			dateInput.className = "qs_text_input";

			container.appendChild(label);
			container.appendChild(dateInput);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: dateInput,
				label: label,
				callback: callback
			}

			var gch = this._globalChangeHandler;
			dateInput.addEventListener("input", function() {
				if(callback) {
					callback(dateInput.value);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		},

		setDate: function(title, date) {
			var control = this._controls[title];

			var dateStr;
			if(date instanceof Date) {
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				if(month < 10) month = "0" + month;
				var day = date.getDate();
				dateStr = year + "-" + month + "-" + day;
			}
			else {
				dateStr = date;
			}

			control.control.value = dateStr || "";
			if(control.callback) {
				control.callback(text);
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			return this;
		},

		bindDate: function(title, date, object) {
			this.addDate(title, date, function(value) {
				object[title] = value;
			});
			return this;
		},

		getDate: function(title) {
			var control = this._controls[title];
			return control.control.value;
		},



		addTime: function(title, time, callback) {
			var timeStr;
			if(time instanceof Date) {
				var hours = time.getHours();
				if(hours < 10) hours = "0" + hours;
				var minutes = time.getMinutes() + 1;
				if(minutes < 10) minutes = "0" + minutes;
				var seconds = time.getSeconds();
				if(seconds < 10) seconds = "0" + seconds;
				timeStr = hours + ":" + minutes + ":" + seconds;
			}
			else {
				timeStr = time;
			}

			if(this._isIE()) {
				return this.addText(title, timeStr, callback);
			}

			var container = this._createContainer();
			var label = this._createLabel("<b>" + title + "</b>");

			var timeInput = document.createElement("input");
			timeInput.type = "time";
			timeInput.id = title;
			timeInput.value = timeStr || "";
			timeInput.className = "qs_text_input";

			container.appendChild(label);
			container.appendChild(timeInput);
			this._content.appendChild(container);
			this._controls[title] = {
				container: container,
				control: timeInput,
				label: label,
				callback: callback
			}

			var gch = this._globalChangeHandler;
			timeInput.addEventListener("input", function() {
				if(callback) {
					callback(timeInput.value);
				}
				if(gch) {
					gch();
				}
			});
			return this;
		},

		setTime: function(title, time) {
			var control = this._controls[title];

			var timeStr;
			if(time instanceof Date) {
				var hours = time.getHours();
				if(hours < 10) hours = "0" + hours;
				var minutes = time.getMinutes() + 1;
				if(minutes < 10) minutes = "0" + minutes;
				var seconds = time.getSeconds();
				if(seconds < 10) seconds = "0" + seconds;
				timeStr = hours + ":" + minutes + ":" + seconds;
			}
			else {
				timeStr = time;
			}

			control.control.value = timeStr || "";
			if(control.callback) {
				control.callback(text);
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			return this;
		},

		getTime: function(title) {
			var control = this._controls[title];
			return control.control.value;
		},

		bindTime: function(title, time, object) {
			this.addTime(title, time, function(value) {
				object[title] = value;
			});
			return this;
		},



		addInfo: function(title, info) {
			var container = this._createContainer();
			container.innerHTML = info;
			this._controls[title] = {
				container: container
			};
			this._content.appendChild(container);
			return this;
		},

		bindDropDown: function(title, items, object) {
			this.addDropDown(title, items, function(value) {
				object[title] = value.value;
			});
			return this;
		},

		addDropDown: function(title, items, callback) {
			var container = this._createContainer();

			// var bg = document.createElement("div");
			// bg.className = "qs_select_bg";


			var label = this._createLabel("<b>" + title + "</b>");
			var select = document.createElement("select");
			for(var i = 0; i < items.length; i++) {
				var option = document.createElement("option");
				option.label = items[i];
				option.innerText = items[i];
				select.add(option);
			};
			var gch = this._globalChangeHandler;
			select.addEventListener("change", function() {
				var index = select.selectedIndex,
					options = select.options;

				if(callback) {
					callback({
						index: index,
						value: options[index].label
					});
				}
				if(gch) {
					gch();
				}
			});
			select.className = "qs_select";

			// bg.appendChild(select);

			container.appendChild(label);
			container.appendChild(select);
			this._content.appendChild(container);

			this._controls[title] = {
				container: container,
				control: select,
				label: label,
				callback: callback
			};
			return this;
		},

		getDropDownValue: function(title) {
			var control = this._controls[title],
				select = control.control,
				index = select.selectedIndex,
				options = select.options;
			return {
				index: index,
				value: options[index].label
			}
		},

		setDropDownIndex: function(title, index) {
			var control = this._controls[title],
				options = control.control.options;
			control.control.selectedIndex = index;
			if(control.callback) {
				control.callback({
					index: index,
					value: options[index].label
				});
			}
			if(this._globalChangeHandler) {
				this._globalChangeHandler();
			}
			return this;
		},

		getInfo: function(title) {
			return this._controls[title].container.innerHTML;
		},

		setInfo: function(title, info) {
			this._controls[title].container.innerHTML = info;
			return this;
		},

		addImage: function(title, imageURL) {
			var container = this._createContainer(),
				label = this._createLabel("<b>" + title + "</b>");
				img = document.createElement("img");
			img.className = "qs_image";
			img.src = imageURL;

			container.appendChild(label);
			container.appendChild(img);
			this._content.appendChild(container);

			this._controls[title] = {
				container: container,
				control: img,
				label: label
			};
			return this;
		},

		setImageURL: function(title, imageURL) {
			this._controls[title].control.src = imageURL;
			return this;
		},

		addProgressBar: function(title, max, value, valueDisplay) {
			var container = this._createContainer(),
				label = this._createLabel(""),
				progressDiv = document.createElement("div"),
				valueDiv = document.createElement("div");
			progressDiv.className = "qs_progress";
			valueDiv.className = "qs_progress_value";
			progressDiv.appendChild(valueDiv);
			valueDiv.style.width = (value / max * 100) + "%";

			if(valueDisplay === "numbers") {
				label.innerHTML = "<b>" + title + ":</b> " + value + " / " + max;
			}
			else if(valueDisplay === "percent") {
				label.innerHTML = "<b>" + title + ":</b> " + Math.round(value / max * 100) + "%";
			}
			else {
				label.innerHTML = "<b>" + title + "</b>";
			}

			container.appendChild(label);
			container.appendChild(progressDiv);
			this._content.appendChild(container);

			this._controls[title] = {
				container: container,
				control: progressDiv,
				valueDiv: valueDiv,
				valueDisplay: valueDisplay,
				label: label,
				value: value,
				max: max
			};
			return this;
		},

		getProgress: function(title) {
			return this._controls[title].control.value;
		},

		setProgress: function(title, value, max) {
			var control = this._controls[title];
			control.value = value;
			if(max) {
				control.max = max;
			}
			control.valueDiv.style.width = (control.value / control.max * 100) + "%";
			if(control.valueDisplay === "numbers") {
				control.label.innerHTML = "<b>" + title + ":</b> " + control.value + " / " + control.max;
			}
			else if(control.valueDisplay === "percent") {
				control.label.innerHTML = "<b>" + title + ":</b> " + Math.round(control.value / control.max * 100) + "%";
			}
			return this;
		},

		addElement: function(title, element) {
			var container = this._createContainer(),
				label = this._createLabel("<b>" + title + "</b>");

			container.appendChild(label);
			container.appendChild(element);
			this._content.appendChild(container);

			this._controls[title] = {
				container: container,
				label: label
			};
			return this;
		},

		addHTML: function(title, html) {
			var div = document.createElement("div");
			div.innerHTML = html;
			this.addElement(title, div);
			return this;
		},

		removeControl: function(title) {
			if(this._controls[title]){
				var container = this._controls[title].container;
			}
			if(container && container.parentElement) {
				container.parentElement.removeChild(container);
			}
			this._controls[title] = null;
			return this;
		},

		enableControl: function(title) {
			if(this._controls[title].control) {
				this._controls[title].control.disabled = false;
			}
			return this;
		},

		disableControl: function(title) {
			if(this._controls[title].control) {
				this._controls[title].control.disabled = true;
			}
			return this;
		},

		parse: function(json, scope) {
			if(typeof json === "string") {
				json = JSON.parse(json);
			}
			var panel = QuickSettings.create(json.x, json.y, json.title);
			panel.setDraggable(json.draggable == null ? true : json.draggable);
			panel.setCollapsible(json.collapsible == null ? true : json.collapsible);
			panel.setGridSize(json.gridSize || 40);
			panel.setSnapToGrid(json.snapToGrid == null ? false : json.snapToGrid);
			scope = scope || {};

			for(var i = 0; i < json.controls.length; i++) {
				var control = json.controls[i];
				switch(control.type) {
					case "range":
						panel.addRange(control.title, control.min || 0, control.max || 100, control.value || control.min || 0, control.step || 1, scope[control.callback]);
						break;

					case "number":
						panel.addNumber(control.title, control.min || 0, control.max || 100, control.value || control.min || 0, control.step || 1, scope[control.callback]);
						break;

					case "boolean":
						panel.addBoolean(control.title, control.value,  scope[control.callback]);
						break;

					case "button":
						panel.addButton(control.title, scope[control.callback]);
						break;

					case "color":
						panel.addColor(control.title, control.value,  scope[control.callback]);
						break;

					case "text":
						panel.addText(control.title, control.value,  scope[control.callback]);
						break;

					case "password":
						panel.addPassword(control.title, control.value,  scope[control.callback]);
						break;

					case "textarea":
					case "textArea":
						panel.addTextArea(control.title, control.value,  scope[control.callback]);
						break;

					case "date":
						panel.addDate(control.title, control.value,  scope[control.callback]);
						break;

					case "time":
						panel.addTime(control.title, control.value,  scope[control.callback]);
						break;

					case "info":
						panel.addInfo(control.title, control.value);
						break;

					case "dropdown":
					case "dropDown":
						panel.addDropDown(control.title, control.value, scope[control.callback]);
						break;

					case "image":
						panel.addImage(control.title, control.value);
						break;

					case "progressbar":
					case "progressBar":
						panel.addProgressBar(control.title, control.max || 100, control.value || 0, control.valueDisplay);
						break;

					case "html":
						panel.addHTML(control.title, control.value);
						break;

				}
			}
			return panel;
		}
	};

	if (typeof define === "function" && define.amd) {
	    define(QuickSettings);
	} else {
	   window.QuickSettings = QuickSettings;
	}

}());
