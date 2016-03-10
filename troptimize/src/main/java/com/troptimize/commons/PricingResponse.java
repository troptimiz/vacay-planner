package com.troptimize.commons;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO response object which hold computed price details.
 * @author m4ver1k
 *
 */
public class PricingResponse {
	
	private int numChild;
	
	private int numAdult;
	
	private BigDecimal childRate;
	
	private BigDecimal adultRate;
	
	private BigDecimal childTotal;
	
	private BigDecimal adultTotal;
	
	private List<TaxDetailsDto> taxes;
	
	private BigDecimal total;
	
	public int getNumChild() {
		return numChild;
	}
	public int getNumAdult() {
		return numAdult;
	}
	public BigDecimal getChildRate() {
		return childRate;
	}
	public BigDecimal getAdultRate() {
		return adultRate;
	}
	public BigDecimal getChildTotal() {
		return childTotal;
	}
	public BigDecimal getAdultTotal() {
		return adultTotal;
	}
	public List<TaxDetailsDto> getTaxes() {
		return taxes;
	}
	
	
	
	public BigDecimal getTotal() {
		return total;
	}
	private PricingResponse(Builder builder){
		this.numChild=builder.numChild;
		this.numAdult=builder.numAdult;
		this.childRate=builder.childRate;
		this.adultRate=builder.adultRate;
		this.adultTotal=builder.adultTotal;
		this.childTotal=builder.childTotal;
		this.taxes=builder.taxes;
		this.total=builder.total;
		
	}
	public static class Builder{
		
		private int numChild=0;
		
		private int numAdult=0;
		
		private BigDecimal childRate;
		
		private BigDecimal adultRate;
		
		private BigDecimal childTotal;
		
		private BigDecimal adultTotal;
		
		private List<TaxDetailsDto> taxes;
		
		private BigDecimal total;
		
		public Builder numChild(int n){
			this.numChild=n;
			return this;
		}
		public Builder numAdult(int n){
			this.numAdult=n;
			return this;
		}
		
		public Builder childRate(double r){
			this.childRate =new BigDecimal(r);
			return this;
		}
		
		public Builder adultRate(double r){
			this.adultRate =new BigDecimal(r);
		
			return this;
		}
		
		public Builder taxes(List<TaxDetailsDto> taxes){
			this.taxes=taxes;
			return this;
		}
		
		public PricingResponse build(){
			this.childTotal= childRate.multiply(new BigDecimal(numChild));
			this.adultTotal= adultRate.multiply(new BigDecimal(numAdult));
			this.total=childTotal.add(adultTotal);
			BigDecimal totalTax=BigDecimal.ZERO;
			
			//this.taxes.forEach(t -> totalTax.add(t.getTotal()));
			for(TaxDetailsDto tax:this.taxes){
				totalTax=totalTax.add(tax.getTotal());
			}
			
			this.total=this.total.add(totalTax);
			return new PricingResponse(this);
		}
	}
}
