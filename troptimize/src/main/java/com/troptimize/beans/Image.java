package com.troptimize.beans;

public class Image {
	private String id;
	private String imageUrl;
	private String captionText;
	private String title;
	private int sortOrder;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getCaptionText() {
		return captionText;
	}
	public void setCaptionText(String captionText) {
		this.captionText = captionText;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(int sortOrder) {
		this.sortOrder = sortOrder;
	}
	
	
}
