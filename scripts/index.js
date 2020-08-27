
(function main() {
 
    const belrus = [
        {
            'name': 'Общая информация',
            'link': './belrus/Общая Информация.pdf'
        },
        {
            'name': 'Список членов ОО РОО Белая Русь',
            'link': './belrus/Список членов ОО РОО Белая Русь ОАО.pdf'
        },
        {
            'name': 'Устав РОО Белая Русь',
            'link': './belrus/Устав РОО Белая Русь.pdf'
        }
    ];

    const brsm = [
        {
            'name': 'План ПО ОО БРСМ 2020',
            'link': './brsm/2020 План ПО ОО БРСМ.pdf'
        },
        {
            'name': 'Структура ПО ОО БРСМ',
            'link': './brsm/2020 Структура ПО ОО БРСМ.pdf'
        },
        {
            'name': 'Информация',
            'link': './brsm/Информация.pdf'
        },
        {
            'name': 'История и современность',
            'link': './brsm/История и современность.pdf'
        },
        {
            'name': 'Как получить Билет',
            'link': './brsm/Как получить Билет.pdf'
        },
        {
            'name': 'Контакты',
            'link': './brsm/Контакты.pdf'
        },
        {
            'name': 'Направление деятельности',
            'link': './brsm/Направление деятельности.pdf'
        },
        {
            'name': 'Секретари',
            'link': './brsm/Секретари.pdf'
        },
        {
            'name': 'Символика',
            'link': './brsm/Символика.pdf'
        },
        {
            'name': 'Скидки',
            'link': './brsm/Скидки.pdf'
        },
        {
            'name': 'Устав ОО БРСМ',
            'link': './brsm/Устав ОО БРСМ.pdf'
        }
    ];

    const young = [
        {
            'name': '2020 План Совета молодых работников ОАО',
            'link': './young/2020 План Совета молодых работников ОАО.pdf'
        },
        {
            'name': 'Приказ и Положение по молодым работникам',
            'link': './young/Приказ и Положение по молодым работникам.PDF'
        }
    ];

    const veteran = [
        {
            'name': 'Ветераны ОАО',
            'link': './veteran/Ветераны ОАО.pdf'
        },
        {
            'name': 'Пасведчанне',
            'link': './veteran/Пасведчанне.pdf'
        },
        {
            'name': 'ПОЛОЖЕНИЕ об общественной организации ветеранов',
            'link': './veteran/ПОЛОЖЕНИЕ об общественной организации ветеранов.pdf'
        },
        {
            'name': 'УСТАВ',
            'link': './veteran/УСТАВ.pdf'
        }
    ];

    let state;
    let currentPage;
    const boxForDocView = document.querySelector('.boxforDocView');
    const listBox = document.querySelector('.boxForList');
    const mainPage = document.querySelector('.boxForButtons'); 
    const contextView = document.querySelector('.boxforDocViewContext');
    const dateAndTime = document.querySelector('.timeAndDate');
   
    function fullingOrders(dataSet, suffix) {
       
        contextView.innerHTML = '';
        dataSet.forEach(act => {
            let docRow = document.createElement('div');
            let imageBox = document.createElement('div');
            let textBox = document.createElement('div');
            imageBox.className = 'imageBox' + suffix;
            docRow.className = 'docRow' + suffix;
            textBox.className = 'textBox' + suffix;
            textBox.innerText = act.name;
            docRow.appendChild(imageBox);
            docRow.appendChild(textBox);
            contextView.appendChild(docRow);
        });
        
        listBox.style.display = 'flex';
        mainPage.style.display = 'none';
    }

    function loadDocInfo(docName, dataset) {
        boxForDocView.childNodes.forEach = [].forEach;
        boxForDocView.childNodes.forEach(node => {
            if (node.className === 'docViewFrame') {
                node.remove();
            }
        });
        let windowDoc = document.createElement('iframe');
        windowDoc.className = 'docViewFrame';
        let src = '';
       
        for (let i in dataset) {
            
            if (dataset[i].name === docName) {
                src = dataset[i].link;
            }
        }
        windowDoc.src = src;
        windowDoc.embedded = 'true';
        boxForDocView.appendChild(windowDoc);
    }

    function showTime(){
        const WEEK_DAYS = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'субота', 'воскресение'];
        const MONTH = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
        const date = new Date();
        const dayOfWeek = date.getDay();
        const month = date.getMonth();
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        
        dateAndTime.innerText = `сегодня ${WEEK_DAYS[dayOfWeek - 1]}, ${day} ${MONTH[month]}
        Время: ${hours.toString().length > 1 ? hours : '0' + hours} : ${minutes.toString().length > 1 ? minutes : '0' + minutes } : ${seconds.toString().length > 1 ? seconds : '0' + seconds}
        Хорошего дня!`;
        setTimeout(showTime, 950);
    }

    showTime();

    
    function clickHandler({ target }) {
        if (target.id === 'belrus') {
            state = belrus;
            currentPage = target;
            fullingOrders(belrus, target.id);            
        } else if (target.id === 'brsm') {
            state = brsm;
            currentPage = target;
            fullingOrders(brsm, target.id);           
        } else if (target.id === 'veterans') {
            state = veteran;
            currentPage = target;
            fullingOrders(veteran, target.id);
        } else if (target.id === 'young') {
            state = young;
            currentPage = target;
            fullingOrders(young, target.id);
        }
         else if (target.className === 'backButton' || target.parentNode.className === 'backButton') {
            state = '';
            listBox.style.display = 'none';
            mainPage.style.display = 'flex';
        } else if (target.className.indexOf('docRow') != -1 || target.parentNode.className.indexOf('docRow') != -1) {
            boxForDocView.style.display = 'flex';
            listBox.style.display = 'none';
            loadDocInfo(target.innerText  || target.parentNode.innerText, state);
        } else if (target.className === 'backButtonDocView' || target.parentNode.className === 'backButtonDocView') {
            boxForDocView.style.display = 'none';    
           listBox.style.display = 'flex';       
        }
    }
    document.addEventListener('click', clickHandler);
})();


/*



*/