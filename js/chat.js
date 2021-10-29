window.$ = window.jQuery = require('jquery');

// get current time.
function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

// Función que se ejecuta al presionar enter en el chatbox
function getResponse() {

    let userText = $("#textInput").val();

    // Si no se escribe nada, termina la función
    if (userText == "") {
        return;
    }

    // Sends the message to twitch.py
    twitch.send(userText).end;

    // Create chat message from recieved data
    let userHtml = `
                <article class="msg-container msg-self" id="msg-0">
                    <div class="msg-box">
                        <div class="flr">
                            <div class="messages">
                                <span class="timestamp"><span class="username">You</span><span class="posttime">` + moment().format('hh:mm A') + `</span></span>
                                <br>
                                <p class="msg" id="msg-0">
                                    ` + userText + `
                                </p>
                            </div>
                        </div>

                    </div>
                    <div class="icon-container">
                    <img class="user-img" id="user-0" src="https://gravatar.com/avatar/56234674574535734573000000000001?d=retro" />
                    <img class="status-circle" id="user-0" src="./images/twitch-icon.png" />
                </div>
                </article>`;

    // Appends the message to the main chat box (shows the message)
    $("#chatbox").append(userHtml);

    // Auto-scrolls the window to the last recieved message
    let [lastMsg] = $('.msg-container').last();
    lastMsg.scrollIntoView({ behavior: 'smooth' });
    $("#textInput").val("");
}

function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("mid").scrollIntoView(true);
}

function sendButton() {
    getResponse();
}

//Función que se ejecuta cuando se presiona "enter" en el cuadro de texto de escribir
$("#textInput").keypress(function(e) {
    if (e.which == 13) {
        getResponse();
    }
});

//Función que se ejecuta cuando se le da clic al botón de enviar mensaje
$("#SendButton").click(function() {
    getResponse();
})

// Left panel retract function
$('.circle-left').click(function() {
    let spWidthLeft = $('.sidepanel-left').width();
    let spMarginLeft = parseInt($('.sidepanel-left').css('margin-left'), 10);
    let w = (spMarginLeft >= 0) ? spWidthLeft * -1 : 0;
    let cw = (w < 0) ? -w : spWidthLeft;
    $('.sidepanel-left').animate({
        marginLeft: w
    });
    $('.sidepanel-left span').animate({
        marginLeft: w
    });
    $('.circle-left').animate({
        left: cw
    }, function() {
        $('.fa-chevron-left').toggleClass('hide');
        $('.fa-chevron-right').toggleClass('hide');
    });
});

// Right panel retract function
$('.circle-right').click(function() {
    let spWidthRight = $('.sidepanel-right').width();
    let spMarginRight = parseInt($('.sidepanel-right').css('margin-right'), 10);
    let w = (spMarginRight >= 0) ? spWidthRight * -1 : 0;
    let cw = (w < 0) ? -w : spWidthRight;
    $('.sidepanel-right').animate({
        marginRight: w
    });
    $('.sidepanel-right span').animate({
        marginRight: w
    });
    $('.circle-right').animate({
        right: cw
    }, function() {
        $('.fa-chevron-left').toggleClass('hide');
        $('.fa-chevron-right').toggleClass('hide');
    });
});

// TODO: animate Optionpanels
// Function that shows and hides the option panels. (TTS, Configuration, Commands)
const display_panel = (panelSelectorClass, panelSelectorID, btnSelectorID) => {
    const btn = document.querySelector(btnSelectorID);
    const panel = document.querySelector(panelSelectorID);
    const panels = document.querySelectorAll(panelSelectorClass);

    btn.addEventListener('click', (event) => {
        event.stopPropagation();
        panels.forEach(el => {
            if (el == panel) return;
            el.classList.remove('show');
        })
        if (panel.classList.contains('show')) {
            panel.classList.remove('show');
        } else {
            panel.classList.add('show');
        }
    }, {
        capture: true
    })
}

display_panel('.OptionPanel', '#Configuration', '#btnConfiguration');
display_panel('.OptionPanel', '#Commands', '#btnCommands');
display_panel('.OptionPanel', '#TTS', '#btnTTS');
display_panel('.OptionPanel', '#Chat', '#btnChat');

const display_panelx = (panelSelectorClass, panelSelectorID, btnSelectorID) => {
    const btn = document.querySelector(btnSelectorID);
    const panel = document.querySelector(panelSelectorID);
    const panels = document.querySelectorAll(panelSelectorClass);

    btn.addEventListener('click', (event) => {
        event.stopPropagation();
        panels.forEach(el => {
            if (el == panel) return;
            el.classList.remove('item-active');
        })
        if (panel.classList.contains('item-active')) {
            panel.classList.remove('item-active');
        } else {
            panel.classList.add('item-active');
        }
    }, {
        capture: true
    })
}

display_panelx('.item', '#btnTTS', '#btnTTS');
display_panelx('.item', '#btnChat', '#btnChat');
display_panelx('.item', '#btnCommands', '#btnCommands');
display_panelx('.item', '#btnConfiguration', '#btnConfiguration');

// Volume slider
var $slider = $("#slider");
var $sliderx = $("#sliderx");

slider.addEventListener('change', setRange)
sliderx.addEventListener('change', setRangex)

function setRange(event) {
    value = event.target.value;
    const label = document.getElementsByClassName('TTSVolume')[0];
    label.textContent = value + "%";
}

function setRangex(event) {
    value = event.target.value;
    const label = document.getElementsByClassName('TTSVolumex')[0];
    label.textContent = value + "%";
}

var $fill = $(".bar .fill");
var $fillx = $(".bar .fill");

//let fillx = document.querySelector('#slider').closest('div.slider-container').querySelector('.fill');
//console.log(fillx);

function setBar() {
    $fill.css("width", $slider.val() + "%");
}

function setBarx() {
    $fillx.css("width", $sliderx.val() + "%");
}

$slider.on("input", setBar);
$sliderx.on("input", setBarx);

setBar();
setBarx();