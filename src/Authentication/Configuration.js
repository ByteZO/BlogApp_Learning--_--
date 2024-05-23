import { Client, Account, ID, Storage, Databases, Query } from "appwrite";
import Config from "../Config/Config";

class Services {
  client = new Client();
  Databases;
  Bucket;

  constructor() {
    this.client.setEndpoint(Config.appWriteUrl).setProject(Config.appWriteId);
    this.Databases = new Databases(this.client);
    this.Bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, status, featuredImage, userId }) {
    try {
      return await this.Databases.createDocument(
        Config.appWriteDatabase,
        Config.appWriteCollection,
        ID.unique(),
        { title, slug, content, status, featuredImage, userId }
      );
    } catch (error) {
      console.log("AppWrite Create Post Error :", error);
    }
  }

  async updatePost(slug, { title, content, status, featuredImage }) {
    try {
      return await this.Databases.updateDocument(
        Config.appWriteDatabase,
        Config.appWriteCollection,
        slug,
        {
          title,
          status,
          content,
          featuredImage,
        }
      );
    } catch (error) {
      console.log("AppWrite Update Post Error : ", error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.Databases.deleteDocument(
        Config.appWriteDatabase,
        Config.appWriteCollection,
        slug
      );
    } catch (error) {
      console.log("AppWrite Delete Post Error : ", error);
    }
  }

  async getPost(slug) {
    try {
      return await this.Databases.getDocument(
        Config.appWriteDatabase,
        Config.appWriteCollection,
        slug
      );
    } catch (error) {
      console.log("AppWrite get Post Error : ", error);
      return false;
    }
  }

  async getPosts(query = [Query.equal("status", "active")]) {
    try {
      return await this.Databases.listDocuments(
        Config.appWriteDatabase,
        Config.appWriteCollection,
        query
      );
    } catch (error) {
      console.log("AppWrite get Posts Error : ", error);
    }
  }

  //   File Handlling Methods

  async uploadeImage(file) {
    try {
      return await this.Bucket.createFile(
        Config.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("AppWrite uploade Image Error : ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.Bucket.deleteFile(Config.appWriteCollection, fileId);
    } catch (error) {
      console.log("AppWrite file delete Error : ", error);
      return false;
    }
  }

  async updateImage(fileId, file) {
    try {
      return await this.Bucket.updateFile(
        Config.appWriteBucketId,
        fileId,
        file
      );
    } catch (error) {
      console.log("AppWrite update Image Error : ", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      return await this.Bucket.getFilePreview(Config.appWriteBucketId, fileId);
    } catch (error) {
      console.log("AppWrite Image Preview Image Error : ", error);
      return false;
    }
  }
}

const services = new Services();

export default services;
