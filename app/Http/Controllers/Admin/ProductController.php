<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Company;
use App\Models\Product;
use App\RecordStatus;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Product::class);

        return Inertia::render('admin/products/index', [
            'products' => Product::query()
                ->select(['id', 'company_id', 'name', 'slug', 'status', 'product_type', 'customer_segment', 'created_at'])
                ->with('company:id,name')
                ->withCount('programmes')
                ->when($request->string('search')->isNotEmpty(), fn ($query) => $query->where('name', 'like', '%'.$request->string('search')->value().'%'))
                ->latest()
                ->paginate(15)
                ->withQueryString(),
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Product::class);

        return Inertia::render('admin/products/form', $this->formOptions());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $product = Product::create($request->validated());

        return to_route('admin.products.show', $product)->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): Response
    {
        Gate::authorize('view', $product);

        return Inertia::render('admin/products/show', ['product' => $product->load(['company:id,name', 'programmes:id,product_id,name,status,duration_days,duration_nights'])]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): Response
    {
        Gate::authorize('update', $product);

        return Inertia::render('admin/products/form', [...$this->formOptions(), 'product' => $product]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $product->update($request->validated());

        return to_route('admin.products.show', $product)->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        Gate::authorize('delete', $product);
        $product->delete();

        return to_route('admin.products.index')->with('success', 'Product deleted.');
    }

    /** @return array<string, mixed> */
    private function formOptions(): array
    {
        return [
            'companies' => Company::query()->select(['id', 'name'])->orderBy('name')->get(),
            'statuses' => RecordStatus::cases(),
        ];
    }
}
