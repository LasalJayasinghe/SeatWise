<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailNotify extends Mailable
{
    use Queueable, SerializesModels;

    private $data =[];

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this ->data =$data;
    }

public function build()


{


    return $this ->from('wmadushi49@gmail.com','Madushi')
    ->subject($this->data['subject']) ->view('emails.index')->with('data',$this->data);
}
    /**
     * Get the message envelope.
     *
     
     */
   
}
