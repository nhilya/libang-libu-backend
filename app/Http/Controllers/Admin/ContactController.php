<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use App\Models\School;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Contact::class);

        return Inertia::render('admin/contacts/index', [
            'contacts' => Contact::query()->select(['id', 'school_id', 'name', 'role', 'phone', 'email', 'is_primary', 'created_at'])
                ->with('school:id,name')
                ->when($request->string('search')->isNotEmpty(), fn ($query) => $query->where('name', 'like', '%'.$request->string('search')->value().'%'))
                ->latest()->paginate(15)->withQueryString(),
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Contact::class);

        return Inertia::render('admin/contacts/form', ['schools' => $this->schools()]);
    }

    public function store(StoreContactRequest $request): RedirectResponse
    {
        $contact = Contact::create($request->validated());
        $this->keepOnePrimaryContact($contact);

        return to_route('admin.schools.show', $contact->school_id)->with('success', 'Contact created successfully.');
    }

    public function edit(Contact $contact): Response
    {
        Gate::authorize('update', $contact);

        return Inertia::render('admin/contacts/form', ['contact' => $contact, 'schools' => $this->schools()]);
    }

    public function update(UpdateContactRequest $request, Contact $contact): RedirectResponse
    {
        $contact->update($request->validated());
        $this->keepOnePrimaryContact($contact);

        return to_route('admin.schools.show', $contact->school_id)->with('success', 'Contact updated successfully.');
    }

    public function destroy(Contact $contact): RedirectResponse
    {
        Gate::authorize('delete', $contact);
        $schoolId = $contact->school_id;
        $contact->delete();

        return to_route('admin.schools.show', $schoolId)->with('success', 'Contact deleted.');
    }

    private function keepOnePrimaryContact(Contact $contact): void
    {
        if ($contact->is_primary) {
            Contact::whereBelongsTo($contact->school)->whereKeyNot($contact)->update(['is_primary' => false]);
        }
    }

    /** @return Collection<int, School> */
    private function schools(): Collection
    {
        return School::query()->select(['id', 'name'])->orderBy('name')->get();
    }
}
