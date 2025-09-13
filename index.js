document.addEventListener("DOMContentLoaded", function () {
  const openChatBtn = document.querySelector(".open-chat-btn");
  const closeChatBtn = document.querySelector(".close-chat-btn");
  const chatOverlay = document.querySelector(".chat-overlay");
  const messagesContainer = document.querySelector(".messages-container");
  const messageInput = document.querySelector(".message-input");
  const sendBtn = document.querySelector(".send-btn");

  // Открытие чата
  openChatBtn.addEventListener("click", function () {
    chatOverlay.classList.add("active");
    scrollToBottom();
  });

  // Закрытие чата
  closeChatBtn.addEventListener("click", function () {
    chatOverlay.classList.remove("active");
  });

  // Закрытие чата при клике на оверлей
  chatOverlay.addEventListener("click", function (e) {
    if (e.target === chatOverlay) {
      chatOverlay.classList.remove("active");
    }
  });

  // Автоматическое изменение высоты текстового поля
  messageInput.addEventListener("input", function () {
    // Сохраняем текущую высоту и прокрутку
    const prevScrollHeight = this.scrollHeight;
    const prevScrollTop = this.scrollTop;

    // Сбрасываем высоту до минимума (1 строка)
    this.style.height = "auto";

    // Вычисляем высоту контента
    const contentHeight = this.scrollHeight;
    const lineHeight = parseInt(getComputedStyle(this).lineHeight);

    // Вычисляем количество строк
    const lines = Math.floor(contentHeight / lineHeight);

    if (lines <= 4) {
      // До 4 строк - фиксированная высота на 4 строки
      this.style.height = lineHeight * 4 + "px";
      this.style.overflowY = "hidden";
    } else if (lines <= 7) {
      // От 5 до 7 строк - высота по контенту
      this.style.height = contentHeight + "px";
      this.style.overflowY = "hidden";
    } else {
      // Более 7 строк - фиксированная высота на 7 строк со скроллом
      this.style.height = lineHeight * 7 + "px";
      this.style.overflowY = "auto";
    }

    // Восстанавливаем позицию прокрутки
    this.scrollTop = prevScrollTop;
  });

  // Функция прокрутки вниз
  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Отправка сообщения
  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === "") return;

    // Создание нового сообщения
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "sent", "recent");

    const currentTime = new Date();
    const timeString =
      currentTime.getHours() +
      ":" +
      (currentTime.getMinutes() < 10 ? "0" : "") +
      currentTime.getMinutes();

    newMessage.innerHTML = `
           <div class="contact-info">
            <div class="avatar avatar_small user-avatar"></div>
            <p>${messageText}</p>
           </div>
           <div class="message-time">${timeString}</div>
         `;

    // Добавление сообщения в контейнер
    messagesContainer.appendChild(newMessage);

    // Очистка поля ввода
    messageInput.value = "";
    messageInput.style.height = "auto";

    // Прокрутка к новому сообщению
    scrollToBottom();

    // Удаление класса recent через 2 секунды
    setTimeout(() => {
      newMessage.classList.remove("recent");
    }, 2000);
  }

  // Изначальная прокрутка вниз
  scrollToBottom();
});
