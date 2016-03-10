package com.troptimize.service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.troptimize.beans.Package;
import com.troptimize.beans.PriceRule;
import com.troptimize.beans.Product;
import com.troptimize.beans.TaxDetails;
import com.troptimize.commons.AgeGroup;
import com.troptimize.commons.PriceAdjustmentType;
import com.troptimize.commons.PricingRequest;
import com.troptimize.commons.PricingResponse;
import com.troptimize.commons.TaxDetailsDto;
import com.troptimize.repositories.TaxRepository;

@Service
public class PricingService {
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private TaxRepository taxRepository; 
	
	public PricingResponse compute(PricingRequest pricingRequest) {
		Product product = productService.findById(pricingRequest.getProductId());
		if (product == null) {
			return null;
		}
		
		Package pkg = product.getPackagesMap().get(pricingRequest.getPackageId());
		
		if (pkg == null) {
			return null;
		}		
		
		double aldultPrice = this.computeAgeGroupPrice(pkg, AgeGroup.ADULT);
		double childPrice = this.computeAgeGroupPrice(pkg, AgeGroup.CHILD);
		
		double total=aldultPrice*pricingRequest.getNumAdult();
		total+=childPrice*pricingRequest.getNumChild();
		
		
		List<TaxDetailsDto> taxResponse  = this.computeTax(product, total, pricingRequest.getNumAdult()+pricingRequest.getNumChild());
		
		return new PricingResponse.Builder()
				.numAdult(pricingRequest.getNumAdult())
				.numChild(pricingRequest.getNumChild())
				.adultRate(aldultPrice)
				.childRate(childPrice)
				.taxes(taxResponse)
				.build();
	}
	private List<TaxDetailsDto> computeTax(Product product,double totalAmount,int totalCount){
		List<TaxDetailsDto> taxResponse = new ArrayList<>();
		for(Map<String, String> taxMap:product.getTaxes()){
			double curTaxAmount=0d;
			TaxDetails tax=  taxRepository.findOne(taxMap.get("taxId"));
			curTaxAmount=totalAmount*(tax.getTax()/100);
			DecimalFormat df = new DecimalFormat("#.##");
			curTaxAmount=Double.valueOf(df.format(curTaxAmount));
			taxResponse.add(new TaxDetailsDto(tax.getTaxDescription(),totalCount,curTaxAmount/totalCount,curTaxAmount));
		}
		return taxResponse;
				
	}
	private double computeAgeGroupPrice(Package pkg,AgeGroup ageGroup){
		double price=pkg.getCost();
		 List<PriceRule> priceRules= pkg.getPriceRuleDetails()
			 .stream()
			 .filter(p -> p.getPriceRuleType().equals("gender"))  //TODO: consider moving to enum
			 .filter(p -> p.getGenderType().equals(ageGroup.getValue()))
			 .limit(1)
			 .collect(Collectors.toList());
		 if(priceRules!=null && priceRules.size()>0){
			 PriceRule curPriceRule= priceRules.get(0);
			 if(curPriceRule.getPriceType().equals(PriceAdjustmentType.PERCENTAGE.getValue())){
				//TODO Change to BigDecimal
				 price=pkg.getCost() -(pkg.getCost()*(curPriceRule.getPrice()/100)); 
			 }else{
				 price=pkg.getCost() -curPriceRule.getPrice();
			 }
		 }
		return price;
	}

	//calculate Tax

}
