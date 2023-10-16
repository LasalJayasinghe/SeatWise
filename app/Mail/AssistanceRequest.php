<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;



class AssistanceRequest extends Mailable
{
    public $emailData;

    public function __construct($emailData)
    {
        $this->emailData = $emailData;
    }

    public function build(){
    $message = "Dear sir, I am from {$this->emailData['restaurantName']}. I need your technical support.";
    $emailAddress =$this->emailData['email'];
    $ToMail = "weerawarnamadushi@gmail.com";
    return $this->
    from($emailAddress)
    ->to( $ToMail)
    ->subject('Assistance Request')
   
        ->text($message);
    }
}
