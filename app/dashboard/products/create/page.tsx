"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Loader2, ChartColumnStacked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useCreateProductMutation } from "@/redux/services/admin/products";
import { Switch } from "@/components/ui/switch";
import { routes } from "@/utils/routes";
import { MESSAGES } from "@/constants/messages";
import TextEditorBar from "@/components/TextEditorBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from "@/components/FileUpload";
import { useGetAllCategoriesQuery } from "@/redux/services/admin/categories";

type FormData = {
  title: string;
  description: string;
  sku: string;
  price: number;
  sale_price: number | null;
  stock_quantity: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  category: string;
  brand: string;
  meta_title: string;
  meta_description: string;
  cover: string;
  images: string[];
  is_active: boolean;
  is_promotion: boolean;
};

const userSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  sku: z.string().min(1, "SKU is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  sale_price: z.number().nullable(),
  stock_quantity: z
    .number()
    .min(0, "Stock quantity must be greater than or equal to 0"),
  weight: z.number().min(0, "Weight must be greater than or equal to 0"),
  dimensions: z.object({
    length: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0),
  }),
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  meta_title: z.string(),
  meta_description: z.string(),
  is_active: z.boolean().default(true),
  is_promotion: z.boolean().default(false),
});

const CreateProductPage = () => {
  const router = useRouter();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [productImages, setProductImages] = useState<File[]>([]);

  const { data: categories, isLoading: isLoadingCategory } =
    useGetAllCategoriesQuery();

  const handleCoverUpload = (files: File[]) => {
    setCoverFile(files[0] || null);
  };

  const handleProductImages = (files: File[]) => {
    setProductImages(files);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      is_active: true,
      is_promotion: false,
      sale_price: null,
      category: "",
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
    },
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start typing your product description here...</p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate: ({ editor }) => {
      setValue("description", editor.getHTML());
    },
  });

  const is_active = watch("is_active");
  const is_promotion = watch("is_promotion");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const loadingToast = toast.loading(MESSAGES.OPERATION.CREATE);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "dimensions") {
          formData.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      if (coverFile) {
        formData.append("cover", coverFile);
      }

      productImages.forEach((file) => {
        formData.append("images[]", file);
      });

      const response = await createProduct(formData).unwrap();

      toast.dismiss(loadingToast);
      if (response.success) {
        toast.success(response.message);
        router.push(routes.adminProducts);
      }
    } catch (error: any) {
      console.error(error);
      toast.dismiss(loadingToast);
      if (error?.status === 422 && error?.data?.errors) {
        Object.keys(error.data.errors).forEach((key) => {
          toast.error(`${error.data.errors[key].join(", ")}`);
        });
      } else {
        toast.error(error?.data?.message || MESSAGES.FAILED.CREATE_FAILED);
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 pt-0">
      <Card className="rounded-xl border bg-card text-card-foreground shadow-lg">
        <CardHeader className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ChartColumnStacked className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-primary">Create Product</CardTitle>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter product title"
                    className="mt-1.5"
                    {...register("title")}
                  />
                  {errors.title && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </span>
                  )}
                </div>

                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    type="text"
                    placeholder="Enter SKU"
                    className="mt-1.5"
                    {...register("sku")}
                  />
                  {errors.sku && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.sku.message}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="mt-1.5"
                      {...register("price", { valueAsNumber: true })}
                    />
                    {errors.price && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.price.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="sale_price">Sale Price (Optional)</Label>
                    <Input
                      id="sale_price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="mt-1.5"
                      {...register("sale_price", { valueAsNumber: true })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <div className="w-full max-w-4xl space-y-4">
                    <TextEditorBar editor={editor} />
                    <EditorContent editor={editor} />
                    {errors.description && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Cover Image</Label>
                  <FileUpload
                    onUpload={handleCoverUpload}
                    maxFiles={1}
                    maxSize={2 * 1024 * 1024}
                    isCover={true}
                  />
                </div>

                <div>
                  <Label>Product Images</Label>
                  <FileUpload
                    onUpload={handleProductImages}
                    maxFiles={5}
                    maxSize={2 * 1024 * 1024}
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Additional Information
                </h3>

                <div className="grid grid-cols-2 items-center gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={watch("category")?.toString() || ""}
                      onValueChange={(value) =>
                        setValue("category", value, { shouldValidate: true })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category">
                          {categories?.find(
                            (cat) =>
                              cat.id.toString() ===
                              watch("category")?.toString()
                          )?.name || "Select category"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {isLoadingCategory ? (
                          <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-5 w-5 animate-spin" />
                          </div>
                        ) : categories?.length ? (
                          categories.map((category) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            No categories available
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.category.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      type="text"
                      placeholder="Enter brand"
                      className="mt-1.5"
                      {...register("brand")}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="stock_quantity">Stock Quantity</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    placeholder="0"
                    className="mt-1.5"
                    {...register("stock_quantity", { valueAsNumber: true })}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-2">Dimensions & Weight</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="mt-1.5"
                        {...register("weight", { valueAsNumber: true })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dimensions.length">Length (cm)</Label>
                      <Input
                        id="dimensions.length"
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        className="mt-1.5"
                        {...register("dimensions.length", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dimensions.width">Width (cm)</Label>
                      <Input
                        id="dimensions.width"
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        className="mt-1.5"
                        {...register("dimensions.width", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dimensions.height">Height (cm)</Label>
                      <Input
                        id="dimensions.height"
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        className="mt-1.5"
                        {...register("dimensions.height", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">SEO Information</h4>
                  <div>
                    <Label htmlFor="meta_title">Meta Title</Label>
                    <Input
                      id="meta_title"
                      type="text"
                      placeholder="Enter meta title"
                      className="mt-1.5"
                      {...register("meta_title")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="meta_description">Meta Description</Label>
                    <Textarea
                      id="meta_description"
                      placeholder="Enter meta description"
                      className="mt-1.5"
                      {...register("meta_description")}
                    />
                  </div>
                </div>

                <div className="space-y-4 bg-secondary/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="is_active">Status</Label>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="is_active"
                        checked={is_active}
                        onCheckedChange={(checked) =>
                          setValue("is_active", checked)
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="is_promotion">Promotion Product</Label>
                    <Switch
                      id="is_promotion"
                      checked={is_promotion}
                      onCheckedChange={(checked) =>
                        setValue("is_promotion", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-6 border-t">
            <div className="flex gap-3">
              <Button type="submit" disabled={isLoading} className="px-8">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    {MESSAGES.OPERATION.CREATE}
                  </>
                ) : (
                  <>{MESSAGES.BUTTONS.CREATE}</>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(routes.adminProducts)}
              >
                Cancel
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateProductPage;
