# 📘 LanguageTutors – Online Language Learning Web App

## Overview

**LanguageTutors** — це фронтенд застосунок для компанії, яка пропонує онлайн-заняття з вивчення іноземних мов. Застосунок дозволяє користувачам переглядати викладачів, фільтрувати їх за різними критеріями, додавати улюблених до обраного, переглядати детальну інформацію та бронювати пробні заняття.

Приложення інтегровано з Firebase для авторизації користувачів та зберігання інформації про викладачів у Realtime Database.

## 🔧 Features

- **Home Page**: Презентаційна сторінка з інформацією про переваги компанії та кнопкою-посиланням на сторінку викладачів.
- **Teachers Page**:
  - Список викладачів, які завантажуються з Firebase.
  - Фільтрація за:
    - Мовою викладання
    - Рівнем знань учнів
    - Ціною за годину
  - Кнопка `Load more` для поступового відображення карток.
  - Кнопка `Read more` відкриває модальне вікно з детальною інформацією та відгуками.
  - Кнопка `Book trial lesson` відкриває форму бронювання з валідацією.
  - Кнопка "серце" `💖` для додавання викладача до списку обраних.
- **Favorites Page**:
  - Доступна лише авторизованим користувачам.
  - Відображає список викладачів, які були додані до обраного.
  - Можливість видалення викладача зі списку.

## 🔐 Authentication

- Реалізовано через **Firebase Authentication**
- Функції:
  - Реєстрація
  - Логінізація
  - Отримання поточного користувача
  - Логаут
- Валідація форм виконана з використанням **react-hook-form** і **yup**
- Форми та модальні вікна закриваються по кліку на `хрестик`, `бекдроп` або клавішу `Esc`

## 🔄 Functional Requirements

- **Маршрутизація**: Використовується `React Router v6` для переходу між сторінками
- **Фільтрація**: Реалізовано за трьома критеріями
- **Favorites**:
  - Додані викладачі зберігаються в `localStorage`
  - Статус улюбленого викладача зберігається після перезавантаження сторінки
  - Недоступно для неавторизованих (зʼявляється попередження)
- **Booking**: Можна заповнити форму для бронювання пробного заняття
- **Модальні вікна**: Реалізовані з можливістю закриття по кнопці, backdrop або клавіші Esc

## 🛠 Technologies Used

- **React + Vite** — основа проєкту
- **React Router v6** — маршрутизація
- **Firebase** — авторизація + Realtime Database
- **React Hook Form + Yup** — валідація форм
- **CSS Modules** — стилізація компонентів
- **localStorage** — збереження обраних викладачів

## 🔎 Firebase Structure

- Колекція `teachers` у Firebase Realtime Database містить поля:
  ```
  name, surname, languages, levels, rating, reviews,
  price_per_hour, lessons_done, avatar_url,
  lesson_info, conditions, experience
  ```

- Дані можуть бути заповнені з локального файлу `teachers.json`

## 📄 Pages

- **Home Page** — з CTA (call to action) і навігацією
- **Teachers Page** — список викладачів, фільтрація, обране
- **Favorites Page** — сторінка обраного, доступна тільки після авторизації

## 📦 How to Run the Project

### Prerequisites

- Node.js ≥ 14
- npm або yarn

### Clone the Repository

```bash
git clone https://github.com/your-username/language-tutors.git
cd language-tutors
```

### Install Dependencies

```bash
npm install
# або
yarn install
```

### Start the Dev Server

```bash
npm run dev
# або
yarn dev
```

### View the App

Відкрий у браузері:  
[http://localhost:5173](http://localhost:5173)

## 🌍 Deployment

Проєкт задеплоєно на Netlify:  
🔗 [https://language-tutors.netlify.app](https://language-tutors.netlify.app)

## 🎨 Design

Сторінки стилізовані згідно з макетом або адаптованим прототипом (унікальний дизайн палітри, компоненти та сітки). Верстка семантична та валідна.

## ✅ Development Practices

- Компонентний підхід
- Чистий, форматований код без зайвих коментарів
- Створено відповідно до принципу DRY
- Немає помилок у браузерній консолі

## 👩‍💻 Author

**Yevheniia Cherepashchuk**  
[GitHub Profile](https://github.com/haydaycher)
