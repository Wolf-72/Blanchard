<?php
// Файлы phpmailer - подключение
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

//Создаём тему письма
$title = "Тема письма";
//$file = $_FILES['file']; //для отправки файлов

$c = true;
// Формирование самого письма, создание переменной body
$title = "Сообщение от пользователя с сайта Blanchard";
foreach ( $_POST as $key => $value ) {
  if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
    $body .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>
    ";
  }
}

//вводим переменную body - это тело нашего письма
$body = "<table style='width: 100%;'>$body</table>";

// Настройки PHPMailer:
// Cоздаём новый PHPMailer c переменной mail с классами из файла PHPMailer.php в папке phpmailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

//настраиваем отправку письма по классам (выше)
//указываем, как мы хотим подключаться
try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;

  // Настройки вашей почты
  $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
  $mail->Username   = 'volkova72.ev@gmail.com'; // Логин на почте
  $mail->Password   = 'xyeoyxiyrsqxcfvh'; // Пароль на почте
  $mail->SMTPSecure = 'ssl'; //шифрование
  $mail->Port       = 465; //порт

  //Откуда отправляется письмо
  $mail->setFrom('volkova72.ev@gmail.com', 'Заявка на звонок'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('avolkova72@yandex.ru');
  //$mail->addAddress('volkova_e@metropoldevelopment.ru'); //вторая почта, если нужна

  // Прикрипление файлов к письму
  // if (!empty($file['name'][0])) {
  //   for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
  //     $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
  //     $filename = $file['name'][$ct];
  //     if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
  //         $mail->addAttachment($uploadfile, $filename);
  //         $rfile[] = "Файл $filename прикреплён";
  //     } else {
  //         $rfile[] = "Не удалось прикрепить файл $filename";
  //     }
  //   }
  // }

  // Отправка письма с преобразованием его в html, с заголовком и с телом письма
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  //Сама отправка письма
  $mail->send();

//Настройка неотправленного сообщения
} catch (Exception $e) {
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
