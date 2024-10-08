"use strict";

var useCaseImage;
var firstValue;

$(document).ready(function () {
  $("#advanceToggle").on('click', function () {
    $("#advanceContent").slideToggle();
    $("#arrow-switch .up-arrow").toggleClass('hidden');
    $("#arrow-switch .down-arrow").toggleClass('hidden');
  });

  var init_language = $('#language').val();
  voiceActor(init_language);

  activeActor();
});

const conversationLimit = $('.conversation-limit').val();

document.addEventListener("DOMContentLoaded", function () {
  const textFieldsContainer = document.getElementById("textFieldsContainer");
  const addTextFieldButton = document.getElementById("addTextField");
  let textAreaCounter = 0;

  addTextFieldButton.addEventListener("click", function () {

    if ($('#textFieldsContainer').find('div.mt-3 > div.text-area-content').last().length > 0) {
      var textareaInput = $('#textFieldsContainer div.mt-3 > div.text-area-content:last textarea[name="prompt[]"]');
    } else {
      var textareaInput = $('.text-area-content').find('textarea[name="prompt[]"]').first();
    }

    var ids = [];
    if (textareaInput.val().trim() === "") {
      return validationCheck(ids, '.textToSpeechInput') ? true : false;
    }

    if ($('#textFieldsContainer').find('div.text-area-content').get().length >= conversationLimit) {
      toastMixin.fire({
        title: jsLang("You have reached your maximum text blocks limit."),
        icon: 'error'
      });
      return ;
    }
    
    var actorImage = $('.pick-actor').data('src');
    var actorLang = $('.pick-actor').data('lang-code');
    var actorVoice = $('.pick-actor').data('name');
    var actorGender = $('.pick-actor').data('gender');
    var actorName = $('.pick-actor').data('value');

    textAreaCounter++;
    const newTextField = document.createElement("div");
    newTextField.className = "mt-3";
    newTextField.innerHTML = `
        <div class="flex justify-end items-center">
            <p class="text-color-89 font-Figtree font-medium text-[13px] leading-5">${jsLang(`Words Limit: ${max_length}`)}</p>
        </div>
        <div class="relative w-full text-area-content">
            <div class="relative valid-parent border grow border-color-89 dark:border-color-47 dark:bg-[#333332] rounded-xl p-2 flex gap-3 mt-2">
                <img class="w-8 h-8 object-cover rounded-full" src="${actorImage}">
                <textarea maxLength="${max_length}"  id="textToSpeech-${textAreaCounter}" data-lang-code="${actorLang}" data-name="${actorVoice}" data-gender="${actorGender}" data-voice="${actorName}" class="py-1 text-base overflow-y-scroll middle-sidebar-scroll leading-6 font-light !text-color-14 dark:!text-white bg-white dark:bg-[#333332] bg-clip-padding bg-no-repeat border border-none dark:!border-none mx-auto focus:text-color-14 focus:bg-white focus:border-none focus:dark:!border-none focus:outline-none px-0 outline-none form-control w-full textToSpeechInput" placeholder="${jsLang('Write down the text you want to voiceover..')}" rows="4" name="prompt[]"></textarea>
            </div>
            <div class="absolute top-[54px] ltr:-right-[15px] ltr:md:-right-[18px] rtl:-left-[15px] rtl:md:-left-[18px]">
                <span class="w-4 h-4 mt-4 text-color-14 dark:text-white cursor-pointer deleteTextField">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3.84615 2.8C3.37884 2.8 3 3.15817 3 3.6V4.4C3 4.84183 3.37884 5.2 3.84615 5.2H4.26923V12.4C4.26923 13.2837 5.0269 14 5.96154 14H11.0385C11.9731 14 12.7308 13.2837 12.7308 12.4V5.2H13.1538C13.6212 5.2 14 4.84183 14 4.4V3.6C14 3.15817 13.6212 2.8 13.1538 2.8H10.1923C10.1923 2.35817 9.81347 2 9.34615 2H7.65385C7.18653 2 6.80769 2.35817 6.80769 2.8H3.84615ZM6.38462 6C6.61827 6 6.80769 6.17909 6.80769 6.4V12C6.80769 12.2209 6.61827 12.4 6.38462 12.4C6.15096 12.4 5.96154 12.2209 5.96154 12L5.96154 6.4C5.96154 6.17909 6.15096 6 6.38462 6ZM8.5 6C8.73366 6 8.92308 6.17909 8.92308 6.4V12C8.92308 12.2209 8.73366 12.4 8.5 12.4C8.26634 12.4 8.07692 12.2209 8.07692 12V6.4C8.07692 6.17909 8.26634 6 8.5 6ZM11.0385 6.4V12C11.0385 12.2209 10.849 12.4 10.6154 12.4C10.3817 12.4 10.1923 12.2209 10.1923 12V6.4C10.1923 6.17909 10.3817 6 10.6154 6C10.849 6 11.0385 6.17909 11.0385 6.4Z" fill="currentColor"/>
                    </svg>
                </span>
            </div>
        </div>
    `;
    textFieldsContainer.appendChild(newTextField);

    const deleteButton = newTextField.querySelector(".deleteTextField");

    deleteButton.addEventListener("click", function () {
      textFieldsContainer.removeChild(newTextField);
    });
  });

});

$('#data-attr').on('change', function() {
  if ($('#textToSpeech-0').val() == '') {
    activeActor();
  }
});

function activeActor(){
  var language_code = $('.pick-actor').data('lang-code');
  var name = $('.pick-actor').data('name');
  var image = $('.pick-actor').data('src');
  var gender = $('.pick-actor').data('gender');
  var actorName = $('.pick-actor').data('value');

  $('#text-area img').attr('src', image);
  $('#text-area textarea').attr('data-name', name);
  $('#text-area textarea').attr('data-lang-code', language_code);
  $('#text-area textarea').attr('data-gender', gender);
  $('#text-area textarea').attr('data-voice', actorName);
}

$(document).on('change', '#language', function() {
  var language = $(this).val();
  voiceActor(language);
});

function voiceActor(language) {
  var arr = [];

  $('div.voice-actor').hide();
  $('div.voice-actor').each(function() {
    var dataLanguage = $(this).data('lang-code');
    if (dataLanguage.startsWith(language) || ( language == 'zh' && dataLanguage == 'yue-HK' )) {
      $(this).show(); 
      arr.push($(this));
    }
  });

  if (arr.length != 0) {
    useCaseImage.setValue(arr[0].data('value'))
  }
  
}

const tomSelectConfiguration = {
    render: {
        option: function (data) {
          return `<div class="voice-actor" data-gender="${data.gender}" data-lang-code="${data.langCode}" data-name="${data.name}"><img src="${data.src}"><span class="line-clamp-single">${data.text}</span></div>`;
      },
        item: function (item) {
          return `<div class="pick-actor" data-gender="${item.gender}" data-lang-code="${item.langCode}" data-name="${item.name}" data-src="${item.src}"><img src="${item.src}"><span class="line-clamp-single">${item.text}</span></div>`;
        }
    },
    onFocus: () => {
        firstValue = useCaseImage.getValue(0);
    },
    onChange: (value) => {
        if (value.length > 0) {
            firstValue = value;
        }
        if (value === '') {
            useCaseImage.setValue(firstValue);
        }
    },
};

$('#data-attr').each(function() {
  useCaseImage = new TomSelect(this, tomSelectConfiguration);
  useCaseImage.sync();
});