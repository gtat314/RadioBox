/**
 * 
 * @employSchema
 * @eventListeners
 * @sensibleDefaults
 * @svgSrc
 * @documentation
 * @documentationApi
 * @iconUniformNames
 * @objectifyEventListeners
 * @minimizeProperties
 * @parentElementSelector
 * @distinctEventListeners
 * @propertiesElemUnderscore
 * @propertify
 * @propertyNamingConventions
 * @methodNamingConventions
 * @htmlReadyMethods
 */




/**
 * 
 * @param {Object}                   schema
 * @param {HTMLElement|CSSRule}      schema.parent
 * @param {Boolean}                 [schema.htmlReady]
 * @param {Object[]}                [schema.options]
 * @param {HTMLSourceElement}        schema.options[].title
 * @param {HTMLSourceElement}       [schema.options[].subtitle]
 * @param {String}                  [schema.options[].value]
 * @param {Boolean}                 [schema.options[].selected]
 * @param {SVGElement}              [schema.options[].icon]
 * @param {Function}                [schema.onChange]
 * @param {Object[]}                [schema.eventListeners]
 * @param {String}                   schema.eventListeners[].type
 * @param {Function}                 schema.eventListeners[].listener
 */
function RadioBox( schema ) {

    /**
     * 
     * @property
     * @private
     */
    this._parentElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._onChangeCallback = null;




    if ( typeof schema.parent === 'object' ) {

        this._parentElem = schema.parent;

    } else if ( typeof schema.parent === 'string' ) {

        this._parentElem = document.querySelector( schema.parent );

    }

    if ( schema.hasOwnProperty( 'htmlReady' ) && schema.htmlReady === true ) {

        this._createFromHTML();

    } else {

        this._createFromSchema( schema );

    }

    if ( schema.hasOwnProperty( 'eventListeners' ) ) {

        for ( var q = 0 ; q < schema.eventListeners.length ; q++ ) {

            if ( schema.eventListeners[ q ].type === 'change' ) {

                this._onChangeCallback = schema.eventListeners[ q ].listener;

            }

        }

    }

    if ( schema.hasOwnProperty( 'onChange' ) ) {

        this._onChangeCallback = schema.onChange;

    }

};

/**
 * 
 * @param {Object}               schema
 * @param {HTMLSourceElement}    schema.title
 * @param {HTMLSourceElement}   [schema.subtitle]
 * @param {String}              [schema.value]
 * @param {Boolean}             [schema.selected]
 * @param {SVGElement}          [schema.icon]
 */
RadioBox.prototype.addOption = function( schema ) {

    this.clearError();

    var fragment = document.createDocumentFragment();

    var optionElem = document.createElement( 'DIV' );
    optionElem.classList.add( 'option' );
    fragment.appendChild( optionElem );

    var spanElem = document.createElement( 'SPAN' );
    spanElem.classList.add( 'bullet' );
    optionElem.appendChild( spanElem );

    var textElem = document.createElement( 'DIV' );
    textElem.classList.add( 'text' );
    optionElem.appendChild( textElem );

    var titleElem = document.createElement( 'P' );
    titleElem.classList.add( 'title' );
    titleElem.innerHTML = schema.title;
    textElem.appendChild( titleElem );

    if ( schema.hasOwnProperty( 'subtitle' ) ) {

        var subtitleElem = document.createElement( 'SAMP' );
        subtitleElem.classList.add( 'subtitle' );
        subtitleElem.innerHTML = schema.subtitle;
        textElem.appendChild( subtitleElem );

    }

    if ( schema.hasOwnProperty( 'value' ) ) {

        optionElem.setAttribute( 'data-value', schema.value );

    }

    if ( schema.hasOwnProperty( 'selected' ) ) {

        if ( schema.selected === true ) {

            this.clear();
            optionElem.classList.add( 'selected' );

        }

    }

    if ( schema.hasOwnProperty( 'icon' ) ) {

        var iconElem = document.createElement( 'DIV' );
        iconElem.classList.add( 'icon' );
        iconElem.innerHTML = schema.icon;
        optionElem.appendChild( iconElem );

    }

    optionElem.addEventListener( 'click', this._evt_click_optionElem.bind( this ) );

    this._parentElem.appendChild( fragment );

};

RadioBox.prototype.removeOptions = function() {

    while ( this._parentElem.firstChild ) {

        this._parentElem.removeChild( this._parentElem.firstChild );

    }

};

/**
 * 
 * @returns {String|null}
 */
RadioBox.prototype.getValue = function() {

    var optionSelectedElem = this._parentElem.querySelector( '.option.selected' );

    if ( optionSelectedElem === null ) {

        return null;

    }

    if ( optionSelectedElem.hasAttribute( 'data-value' ) ) {

        return optionSelectedElem.getAttribute( 'data-value' );

    } else {

        return null;

    }

};

/**
 * 
 * @param {String} value 
 */
RadioBox.prototype.setValue = function( value ) {

    this.clearError();

    var options = this._parentElem.querySelectorAll( '.option' );
    var optionsNum = options.length;

    for ( var i = 0 ; i < optionsNum ; i++ ) {

        options[ i ].classList.remove( 'selected' );

    }

    if ( value === null ) {

        return false;

    }

    for ( var q = 0 ; q < optionsNum ; q++ ) {

        if ( options[ q ].getAttribute( 'data-value' ) == value ) {

            options[ q ].classList.add( 'selected' );

        }

    }

};

/**
 * 
 */
RadioBox.prototype.clear = function() {

    this.clearError();

    var options = this._parentElem.querySelectorAll( '.option' );
    var optionsNum = options.length;

    for ( var i = 0 ; i < optionsNum ; i++ ) {

        options[ i ].classList.remove( 'selected' );

    }

};

/**
 * 
 * @param {HTMLSourceElement} errorMessage 
 */
RadioBox.prototype.setError = function() {

    this._parentElem.classList.add( 'error' );

};

/**
 * 
 * @method
 */
RadioBox.prototype.clearError = function() {

    this._parentElem.classList.remove( 'error' );

};




/**
 * 
 * @private
 * @param {Event} evt 
 */
RadioBox.prototype._evt_click_optionElem = function( evt ) {

    this.clearError();

    var options = this._parentElem.querySelectorAll( '.option' );
    var optionsNum = options.length;

    for ( var i = 0 ; i < optionsNum ; i++ ) {

        options[ i ].classList.remove( 'selected' );

    }

    evt.currentTarget.classList.add( 'selected' );

    if ( this._onChangeCallback !== null ) {

        this._onChangeCallback( this.getValue() );

    }

};

/**
 * 
 * @private
 * @method
 */
RadioBox.prototype._createFromHTML = function() {

    var optionElems = this._parentElem.querySelectorAll( '.option' );
    var optionsNum  = optionElems.length;

    for ( var i = 0 ; i < optionsNum ; i++ ) {

        optionElems[ i ].addEventListener( 'click', this._evt_click_optionElem.bind( this ) );

    }

};

/**
 * 
 * @private
 * @method
 * @param {Object} schema
 */
RadioBox.prototype._createFromSchema = function( schema ) {

    var fragment = document.createDocumentFragment();

    for ( var i = 0 ; i < schema.options.length ; i++ ) {

        var optionElem = document.createElement( 'DIV' );
        optionElem.classList.add( 'option' );
        fragment.appendChild( optionElem );

        var spanElem = document.createElement( 'SPAN' );
        spanElem.classList.add( 'bullet' );
        optionElem.appendChild( spanElem );

        var textElem = document.createElement( 'DIV' );
        textElem.classList.add( 'text' );
        optionElem.appendChild( textElem );

        var titleElem = document.createElement( 'P' );
        titleElem.classList.add( 'title' );
        titleElem.innerHTML = schema.options[ i ].title;
        textElem.appendChild( titleElem );

        if ( schema.options[ i ].hasOwnProperty( 'subtitle' ) ) {

            var subtitleElem = document.createElement( 'SAMP' );
            subtitleElem.classList.add( 'subtitle' );
            subtitleElem.innerHTML = schema.options[ i ].subtitle;
            textElem.appendChild( subtitleElem );

        }

        if ( schema.options[ i ].hasOwnProperty( 'value' ) ) {

            optionElem.setAttribute( 'data-value', schema.options[ i ].value );

        }

        if ( schema.options[ i ].hasOwnProperty( 'selected' ) ) {

            if ( schema.options[ i ].selected === true ) {

                optionElem.classList.add( 'selected' );

            }

        }

        if ( schema.options[ i ].hasOwnProperty( 'icon' ) ) {

            var iconElem = document.createElement( 'DIV' );
            iconElem.classList.add( 'icon' );
            iconElem.innerHTML = schema.options[ i ].icon;
            optionElem.appendChild( iconElem );

        }

        optionElem.addEventListener( 'click', this._evt_click_optionElem.bind( this ) );

    }

    this._parentElem.appendChild( fragment );

};