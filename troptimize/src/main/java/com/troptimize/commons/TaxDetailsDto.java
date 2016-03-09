package com.troptimize.commons;

import java.math.BigDecimal;

/**
 * DTO object for Tax details line.One booking can have multiple of these.
 * 
 * @author m4ver1k
 *
 */
public class TaxDetailsDto {
	
	private String text;
	
	private int count;
	
	private BigDecimal amount;
	
	private BigDecimal total;

	public TaxDetailsDto(String text,int count,double amount,double total){
		this.text=text;
		this.count=count;
		this.amount=new BigDecimal(amount);
		this.total=new BigDecimal(total);
	}
	
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amnount) {
		this.amount = amnount;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}
	
}
