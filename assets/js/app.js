(function() {
    const buttonPlus = document.querySelector( '.js-btn-plus' );
    const boxQuestions = document.querySelector( '.js-box-questions' );
    const buttonStart = document.querySelector( '.js-button-start' );
    const modal = document.querySelector( '.js-modal' );
    const modalClose = Array.from( document.getElementsByClassName( 'js-modal-close' ) );

    let fieldTemplate = `
        <div class="flex flex-wrap">
            <div class="w-8/12 mb-4 px-4">
                <input 
                class="w-full outline-0 rounded-lg shadow-xl block font-normal py-2 px-4 js-question"
                type="text"
                name="question[]"
                placeholder="Perguntar...">
            </div>

            <div class="w-4/12 flex items-center mb-4 pr-4 xl:px-4">
                <select 
                class="w-full h-full outline-0 rounded-lg shadow-xl font-semibold text-center px-1 xl:px-4 js-time" 
                name="time[]">
                    <option class="font-semibold" value="1" selected>1</option>
                    <option class="font-semibold" value="2">2</option>
                    <option class="font-semibold" value="3">3</option>
                    <option class="font-semibold" value="4">4</option>
                    <option class="font-semibold" value="5">5</option>
                    <option class="font-semibold" value="10">10</option>
                    <option class="font-semibold" value="15">15</option>
                    <option class="font-semibold" value="20">20</option>
                    <option class="font-semibold" value="25">25</option>
                    <option class="font-semibold" value="30">30</option>
                    <option class="font-semibold" value="35">35</option>
                    <option class="font-semibold" value="40">40</option>
                    <option class="font-semibold" value="45">45</option>
                    <option class="font-semibold" value="50">50</option>
                    <option class="font-semibold" value="55">55</option>
                    <option class="font-semibold" value="60">60</option>
                </select>

                <p class="font-bold text-white pl-4">
                    min
                </p>
            </div>
        </div>
    `;

    if( document.querySelector( '.js-selected-item' ) ) {
        const selecetedItems = Array.from( document.getElementsByClassName( 'js-selected-item' ) );
        const selectedItem = document.querySelector( '.js-selected-current' );

        selecetedItems.forEach(element => {
            element.addEventListener( 'click', function() {
                selectedItem.innerText = this.innerText;
            })
        })
    }

    buttonPlus.addEventListener( 'click', function() {
        boxQuestions.insertAdjacentHTML('beforeend', fieldTemplate);
    })

    buttonStart.addEventListener('click', function() {

        if( this.innerText == 'Finalizar' ) {
            location.reload();
        } else {
            this.innerText = 'Finalizar';

            showNotification();
            toggleBoxQuestions();
            calculateTime();
            listQuestions();
            listTimes();
            progressBar();
        }
    })

    modalClose.forEach(element => {
        element.addEventListener( 'click', function() {
            modal.classList.add( 'hidden' );
            modal.classList.remove( 'flex' );
            document.querySelector( 'body' ).classList.remove( 'overflow-hidden' );
        })
    }); 

    function toggleBoxQuestions() {
        const boxQuestions = document.querySelector( '.js-box-questions' );
        
        boxQuestions.classList.toggle( 'is-active' );
    }

    function calculateTime() {
        const questions = Array.from( document.getElementsByClassName( 'js-question' ) );
        const times = Array.from(document.getElementsByClassName( 'js-time' ));

        times.forEach((element, index) => {
            let second = (element.value * 60) * 1000

            let time = setInterval(function() {
                second = second - 1000
                
                // console.log('Question: ', index, ' Second: ', second)

                if(second <= 0) {
                    clearInterval(time)
                    showQuestion(index)
                }  
            }, 1000)
        })
    }

    function showQuestion( index ) {
        const questions = Array.from( document.getElementsByClassName( 'js-question' ) );
        const modalQuestion = document.querySelector( '.js-modal-question' );

        playSoundNotification();

        modal.classList.add( 'flex' );
        modal.classList.remove( 'hidden' );
        document.querySelector( 'body' ).classList.add( 'overflow-hidden' );
        modalQuestion.innerText = questions[index].value;
    }

    function showNotification() {
        const notification = document.querySelector( '.js-notification' );

        notification.classList.remove( 'hidden' );
        notification.classList.add( 'flex' );

        setTimeout(function() {
            notification.classList.remove( 'flex' );
            notification.classList.add( 'hidden' );
        }, 5000)
    }

    function listQuestions() {
        const listQuestions = document.querySelector( '.js-list-questions' );
        const questions = Array.from( document.getElementsByClassName( 'js-question' ) );

        questions.forEach(element => {
            listQuestions.insertAdjacentHTML( 'beforeend', `<p class="font-bold text-gray-800 mb-4">${element.value}</p>` );
        })
    }

    function listTimes() {
        const listTimes = document.querySelector( '.js-list-times' );
        const times = Array.from( document.getElementsByClassName( 'js-time' ) );

        times.forEach(element => {
            // timer( element.value );
            listTimes.insertAdjacentHTML( 'beforeend', `<p class="font-bold text-gray-800 mb-4">${element.value}min</p>` );
        })
    }

    function progressBar() {
        const times = Array.from(document.getElementsByClassName( 'js-time' ));
        const progressBar = document.querySelector( '.js-progress-bar' );
        let percentageCurrent = 0;
        let percentage = 100;
        let time = 0;
        let collecionTimes = [];

        times.forEach((element, index) => {
            collecionTimes.push(element.value * 60);    
        });

        collecionTimes.forEach(element => {
            setInterval(function() {
                let time = percentage / element;
                percentageCurrent = 100 - time;
                element--;

                progressBar.classList.remove( 'hidden' );
                progressBar.style.width = parseInt(percentageCurrent) + '%';
            }, 1000)
            
        })
    }

    function timer( time ) {
        let seconds = 60;

        let timer = setInterval(() => {
            if( time != 0 )
                time--;

            if( time <= 0 && seconds == 0 )
                clearInterval( timer );

            if( seconds <= 0 ) {
                time--;
                seconds = 60;
            }

            seconds -= 10;

            console.log( 'Time: ', time );
            console.log( 'Seconds: ', seconds );
        }, 1000)
    }

    function playSoundNotification() {
        const soundNotification = document.getElementById( 'soundNotification' );
        
        setTimeout( function() {
            soundNotification.play();
        }, 1000);

        setTimeout(function() {
            soundNotification.pause();
        }, 5000);
    }
})()