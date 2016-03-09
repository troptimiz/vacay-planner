package com.troptimize.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {
	@Autowired
	private JavaMailSender mailSender;
	
	public boolean sendMail(String from,String to, String subject,String message){
		MimeMessage mimeMessage = this.mailSender.createMimeMessage();
		MimeMessageHelper messageHelper;
		
		try {
			messageHelper =  new MimeMessageHelper(mimeMessage, true);
			messageHelper.setTo(to);
			messageHelper.setFrom(from);
			messageHelper.setSubject(subject);
			//messageHelper.setText(message);
			mimeMessage.setContent(message, "text/html");
			mailSender.send(mimeMessage);
			return true;
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		return false;
		
		
	}
	
}
