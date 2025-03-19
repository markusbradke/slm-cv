<?php

namespace App\Http\Requests;

use App\Enums\TermStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTermRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:255',
            // 'vocabulary_id' => 'required|exists:vocabularies,id',
            'definition' => 'required',
            'provenance' => 'nullable',
            'provenance_uri' => 'nullable|url:https,http',
            'discussion_url' => 'nullable|url:https,http',
            'notes' => 'nullable',
            'status' => [
                'required',
                Rule::in(array_column(TermStatus::cases(), 'value')),
            ],
        ];
    }
}
