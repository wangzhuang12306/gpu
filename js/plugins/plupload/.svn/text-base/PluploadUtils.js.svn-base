/**
 * @author yli
 */
function PluploadConfig() {
	//var _runtimes = "gears,html5,flash,silverlight,browserplus,html4";
	var _runtimes = "html5";
	this.getRuntimes = function() {return _runtimes;};
	/**
	 * @param runtimes(String)
	 * This is a comma separated list of runtimes that you want to initialize the uploader instance with. It will try to initialize each runtime in order if one fails it will move on to the next one.default gears,html5,flash,silverlight,browserplus,html4
	 */
	this.setRuntimes = function(runtimes) {_runtimes = runtimes;};
	var _flashSwfUrl = "/js/plupload/plupload.flash.swf";
	this.getFlashSwfUrl = function() {return _flashSwfUrl;};
	/**
	 * @param flashSwfUrl(String)
	 * URL to where the SWF file is for the Flash runtime.
	 */
	this.setFlashSwfUrl = function(flashSwfUrl) {_flashSwfUrl = flashSwfUrl;};
	
	var _silverlightXapUrl = "/js/plupload/plupload.silverlight.xap";
	this.getSilverlightXapUrl = function() {return _silverlightXapUrl;};
	/**
	 * @param silverlightXapUrl(String)
	 * URL to where the XAP file is for the Silverlight runtime.
	 */
	this.setSilverlightXapUrl = function(silverlightXapUrl) {_silverlightXapUrl = silverlightXapUrl;};
	
	var _width = null;
	this.getWidth = function() {return _width;};
	/**
	 * @deprecated
	 * @param width(String)
	 * Enables plupload to resize the images to clientside to the specified width.
	 */
	this.setWidth = function(width) {_width = width;};
	
	var _height = null;
	this.getHeight = function() {return _height;};
	/**
	 * @deprecated
	 * @param height(String)
	 * Enables plupload to resize the images to clientside to the specified height.
	 */
	this.setHeight = function(height) {_height = height;};
	
	var _quality = null;
	this.getQuality = function() {return _quality;};
	/**
	 * @deprecated
	 * @param quality(int)
	 * Enables plupload to resize the images to clientside to the specified quality. default 90
	 */
	this.setQuality = function(quality) {_quality = quality;};
	
	var _typeTypeFilters = new Array();
	/**
	 * @param filter(Object @see PluploadFileTypeFilter)
	 * Add filter to apply when the user selects files. This is currently file extension filters there are two items for each filter. title and extensions.
	 */
	this.addFileTypeFilter = function(filter) {_typeTypeFilters[_typeTypeFilters.length] = filter;};
	this.getFileTypeFilters = function() {return _typeTypeFilters;};
	
	var _url = new String();
	this.getUrl = function() {return _url;};
	/**
	 * @param url(String)
	 * Page URL to where the files will be uploaded to.
	 */
	this.setUrl = function(url) {_url = url;};
	
	var _maxFileSize = "10mb";
	this.getMaxFileSize = function() {return _maxFileSize;};
	/**
	 * @param maxFileSize(String)
	 * Maximum file size that the user can pick. This string can be in the following formats 100b, 10kb, 10mb. defalut 10mb
	 */
	this.setMaxFileSize = function(maxFileSize) {_maxFileSize = maxFileSize;};
	
	var _chunkSize = null;
	this.getChunkSize = function() {return _chunkSize;};
	/**
	 * @deprecated
	 * @param chunkSize(String)
	 * Enables you to chunk the file into smaller pieces for example if your PHP backend has a max post size of 1MB you can chunk a 10MB file into 10 requests. To disable chunking, remove this config option from your setup.
	 */
	this.setChunkSize = function(chunkSize) {_chunkSize = chunkSize;};
	
	var _uniqueName = false;
	this.getUniqueName = function() {return _uniqueName;};
	/**
	 * @param uniqueName(Boolean)
	 * Generate unique filenames when uploading. This will generate unqiue filenames for the files so that they don't for example collide with existing ones on the server. default false
	 */
	this.setUniqueName = function(uniqueName) {_uniqueName = uniqueName;};
	
	var _browseButton = "browse...";
	this.getBrowseButton = function() {return _browseButton;};
	/**
	 * @param browseButton(String)
	 * String with the ID of the browse button. Flash, HTML 5 and Silverlight requires a shim so you need to specify the id of the button that the shim will be placed above for those runtimes. This option is not required for by the queue widget. default browse...
	 */
	this.setBrowseButton = function(browseButton) {_browseButton = browseButton;};
	
	var _dropElement = null;
	this.getDropElement = function() {return _dropElement;};
	/**
	 * @param dropElement(String)
	 * String with the ID of the element that you want to be able to drop files into this is only used by some runtimes that support it.
	 */
	this.setDropElement = function(dropElement) {_dropElement = dropElement;};
	
	var _multipart = null;
	this.getMultipart = function() {return _multipart;};
	/**
	 * @param multipart(Boolean)
	 * Boolean state if the files should be uploaded using mutlipart instead of direct binary streams. Doesn't work on WebKit using the HTML 5 runtime.
	 */
	this.setMultipart = function(multipart) {_multipart = multipart;};
	
	var _container = null;
	this.getContainer = function() {return _container;};
	/**
	 * @param container(String)
	 * Element ID to add object elements to, this defaults to the document body element.
	 */
	this.setContainer = function(container) {_container = container;};
	
	var _multipartParams = new Object();
	this.getMultipartParams = function() {return _multipartParams;};
	/**
	 * @param key(String)
	 * @param value(String)
	 * Object key/value collection with arguments to get posted together with the multipart file.
	 */
	this.addMultipartParam = function(key, value) {_multipartParams[key] = value;};
	
	var _requiredFeatures = null;
	this.getRequiredFeatures = function() {return _requiredFeatures;};
	/**
	 * @param requiredFeatures(String)
	 * Comma separated list of features that each runtime must have for it to initialize.
	 */
	this.setRequiredFeatures = function(requiredFeatures) {_requiredFeatures = requiredFeatures;};
	
	var _headers = new Object();
	this.getHeaders = function() {return _headers;};
	/**
	 * @param key(String)
	 * @param value(String)
	 * key/value object with custom headers to add to HTTP requests.
	 */
	this.addHeader = function(key, value) {_headers[key] = value;};
};
PluploadFileTypeFilter = function() {};

PluploadFileTypeFilter.IMAGE = {title : "Image files", extensions : "tiff,tif,jpe,psd,eps,raw,pxr,mac,jpg,jpeg,bmp,tga,vst,pcd,pct,gif,ai,fpx,img,cal,wi,png,eps,ai,sct,pdp,dxf,ico,icon"};

PluploadFileTypeFilter.other = function(_title, _extensions) {return {title : _title, extensions : _extensions};};

(function() {
	PluploadUploadUtil = {
			newInstance : getInstance
	};
	function getInstance(pluploadConfig) {
		if(PluploadManager.instance == null)
			return new PluploadManager(pluploadConfig);
		else
			return PluploadManager.instance;
	};
	
	function PluploadManager(pluploadConfig) {
		var pluploadManager = this;
		pluploadManager.pluploadConfig = pluploadConfig;
		pluploadManager.divObj = null;
		pluploadManager.params = {};
		pluploadManager.uploader = function() {return pluploadManager.divObj.pluploadQueue();};
		PluploadManager.instance = pluploadManager;
	};
	
	PluploadManager.prototype.settings = function() {
		var pluploadManager = this;
		var setting = new Object();
		setting.runtimes = pluploadManager.pluploadConfig.getRuntimes();
		setting.url = pluploadManager.pluploadConfig.getUrl();
		setting.max_file_size = pluploadManager.pluploadConfig.getMaxFileSize();
		setting.unique_names = pluploadManager.pluploadConfig.getUniqueName();
		if(pluploadManager.pluploadConfig.getWidth() != null)
			setting.resize.width = pluploadManager.pluploadConfig.getWidth();
		if(pluploadManager.pluploadConfig.getHeight() != null)
			setting.resize.height = pluploadManager.pluploadConfig.getHeight();
		if(pluploadManager.pluploadConfig.getQuality() != null)
			setting.resize.quality = pluploadManager.pluploadConfig.getQuality();
		setting.filters = pluploadManager.pluploadConfig.getFileTypeFilters();
		setting.flash_swf_url = pluploadManager.pluploadConfig.getFlashSwfUrl();
		setting.silverlight_xap_url = pluploadManager.pluploadConfig.getSilverlightXapUrl();
		setting.browse_button = pluploadManager.pluploadConfig.getBrowseButton();
		if(pluploadManager.pluploadConfig.getChunkSize() != null)
			setting.chunk_size = pluploadManager.pluploadConfig.getChunkSize();
		if(pluploadManager.pluploadConfig.getDropElement() != null)
			setting.drop_element = pluploadManager.pluploadConfig.getDropElement();
		if(pluploadManager.pluploadConfig.getContainer() != null)
			setting.container = pluploadManager.pluploadConfig.getContainer();
		if(pluploadManager.pluploadConfig.getMultipart() != null)
			setting.multipart = pluploadManager.pluploadConfig.getMultipart();
		if(pluploadManager.pluploadConfig.getMultipartParams() != null)
			setting.multipart_params = pluploadManager.pluploadConfig.getMultipartParams();
		if(pluploadManager.pluploadConfig.getRequiredFeatures() != null)
			setting.required_features = pluploadManager.pluploadConfig.getRequiredFeatures();
		if(pluploadManager.pluploadConfig.getHeaders() != null)
		setting.headers = pluploadManager.pluploadConfig.getHeaders();
		return setting;
	};
	
	PluploadManager.prototype.initPluploadButton = function() {
		return new plupload.Uploader(pluploadManager.settings());
	};
	
	PluploadManager.prototype.initPlupload = function(divObj) {
		var pluploadManager = this;
		pluploadManager.divObj = divObj;
		divObj.pluploadQueue(pluploadManager.settings());
		var up = pluploadManager.divObj.pluploadQueue();
		up.bind("BeforeUpload", function(uploader) {
			for(var key in pluploadManager.params) {
				uploader.settings.multipart_params[key] = pluploadManager.params[key];
			}
		});
		up.bind("UploadComplete", function(uploader, files) {
			var text = $('.plupload_upload_status', self.element).html();
			$('.plupload_upload_status', self.element).html(text + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id=\"go_back_button\" class=\"reupload_button\"> Upload Others </a>");
			document.getElementById("go_back_button").onclick = pluploadManager.initPluploadAgain;
		});
	};
	
	PluploadManager.prototype.initPluploadAgain = function() {
		pluploadManager.initPlupload(pluploadManager.divObj);
	};
	
	PluploadManager.prototype.addFormEvent = function(formObj) {
		var pluploadManager = this;
		var up = pluploadManager.divObj.pluploadQueue();
		formObj.submit(function(event) {
			if (up.files.length > 0) {
	            // When all files are uploaded submit form
				up.bind('StateChanged', function() {
	                if (up.files.length === (up.total.uploaded + up.total.failed)) {
	                	formObj.submit();
	                }
	            });
				up.start();
				return true;
	        } else {
	            alert('You must queue at least one file.');
	            return false;
	        }
		});
	};
	
	PluploadManager.prototype.addParameter = function(key, value) {
		var pluploadManager = this;
		pluploadManager.params[key] = value;
	};
	
})();